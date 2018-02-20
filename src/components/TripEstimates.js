import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { HeaderBackButton } from 'react-navigation';
import _ from 'lodash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Card, Header, Button, CardSection, Spinner, HeaderTrain } from './common';
import { createFavTrip, fetchTrip } from '../actions';
import { waitingMin } from './helper';

class TripEstimates extends Component {

  componentWillMount() {
    const { departureStop, arrivalStop, route, departureStopArrTime } = this.props.navigation.state.params; //from params in navigation dispatch
    this.props.fetchTrip({ departureStop, arrivalStop, route, departureStopArrTime });
    // put trainline, trainstop, boundFor as argument
  }

  static navigationOptions = ({ navigation }) => {
    const drawerButton = (navigation) => {
      return (
        <MaterialIcons
          style={{padding: 5, color: '#3F51B5'}}
          name="menu"
          size={36}
          onPress={() => { navigation.navigate('DrawerToggle')}}
        />
      )
    }
    const { departureStop, arrivalStop, route } = navigation.state.params;
    const refresh = (navigation, params) => {
      const refreshPage = () => {
        navigation.navigate('TripEstimates', params)
      }
      return (
        <MaterialIcons
          style={{padding: 5, color: '#3F51B5'}}
          name={'replay'}
          size={36}
          onPress={() => refreshPage()}
        />
      )
    }
    return {
      title: "Trip Estimates",
      headerRight: refresh(navigation, { departureStop, arrivalStop, route }), //NavigationActions.navigate({ routeName }) with Material icon name
                           // navigation, material icon name, route name, params
      headerLeft: drawerButton(navigation)
    }
  }

  renderError(error) {
    if (error) {
      return (
        <Header headerText={error} overwriteTextStyle={{color: '#E57373', fontWeight: 'bold'}}/>
      )
    }
  }

  renderTime(time, error, secText) {
    // console.log(_.isEmpty(time));
    if (!error && !_.isEmpty(time)) { //if there is no error and if the arrival time data object is not empty render time
      let arrTime = moment(time.arrT);
      let seconds = arrTime.second()
      if (Math.round(seconds/60) === 1) { //round up to minutes
        arrTime = moment(arrTime).add(1, 'minutes')
      }
      return (
        <Header
          secondaryText= {secText.text}
          overwriteSecTextStyle={{color: secText.color, fontWeight: 'bold'}}
          headerText={arrTime.format('h:mm a')}
          overwriteTextStyle={{color: '#212121', fontWeight: 'bold'}}
        />
      )
    } else if (!error) {
      return (
        <Header headerText={'Loading...'} />
      )
    }
  }

  onButtonPressSave(departureStop, arrivalStop, route) {
    this.props.createFavTrip({ departureStop, arrivalStop, route });
    this.props.navigation.dispatch(
      {
        type: 'Navigation/NAVIGATE',
        routeName: 'FavTripList',
      }
    )
  }

  renderSaveButton(departureStop, arrivalStop, route) {
    const { favtrips, tripdata } = this.props;
    const renderButton = () => {
      return (
      <Button
        onPress={()=>this.onButtonPressSave(departureStop, arrivalStop, route)}
        overwriteTextStyle={{color: '#E8EAF6'}}
        overwriteButtonStyle={{borderColor: '#9FA8DA', backgroundColor: `#9FA8DA`}}
      >
        Save this Trip
      </Button>
    )}

    if (tripdata.loading) {
      return <Spinner size="large" />
    }
    if (_.isEmpty(favtrips)) {
      return renderButton();
    } else {
      const selectedTrip = { departureStop, arrivalStop, route };
      // check if the stop is already in the list
      // console.log("selectedTrip: ", selectedTrip, "favtrips: ", favtrips);
      const favTripExists = favtrips.some((favtrip) => (
        favtrip.route.name === selectedTrip.route.name &&
        favtrip.departureStop.name === selectedTrip.departureStop.name &&
        favtrip.arrivalStop.name === selectedTrip.arrivalStop.name
      ))
      if (!favTripExists) { //if the selected stop does not exist in the fav stop list
        return renderButton()
      }
    }
  }

  render() {
    const { tripDepartureTime, tripArrivalTime, error, timestamp } = this.props.tripdata;
    const { departureStop, arrivalStop, route } = this.props.navigation.state.params;
    // console.log( "is state to props called twice in render?", route ) // once with empty object and once with object with data
    // console.log('tripDepartureTime: ', tripDepartureTime, 'tripArrivalTime: ', tripArrivalTime, 'route: ', route);
    const secTextDeparture = {text: `${waitingMin(tripDepartureTime)}   `, color: '#455A64'}
    const secTextArrival = {text: `${waitingMin(tripArrivalTime)}   `, color: '#455A64'}
    return (
      <Card overwriteCardStyle={{borderColor: route.sectextcolor}}>
        <HeaderTrain
          headerText={`  ${_.capitalize(route.name)} Line`}
          overwriteTextStyle={{color: route.primarycolor, fontWeight: 'bold'}}
          trainColor={route.primarycolor}
        />
        <Header
          secondaryText='Departure: '
          headerText={departureStop.name}
          overwriteTextStyle={{color: '#212121', fontWeight: 'bold'}}
        />
        {this.renderTime(tripDepartureTime, error, secTextDeparture)}
        <Header
          secondaryText='Arrival: '
          headerText={arrivalStop.name}
          overwriteTextStyle={{color: '#212121', fontWeight: 'bold'}}
        />
        {this.renderTime(tripArrivalTime, error, secTextArrival)}
        <Header
          headerText={`Updated ${moment(timestamp).format('h:mm a')}`}
          overwriteTextStyle={{fontSize: 18}}
        />
        {this.renderError(error)}
        <CardSection>
          {this.renderSaveButton(departureStop, arrivalStop, route)}
        </CardSection>

      </Card>
    )
  }
}

const mapStateToProps = state => {
  const { tripdata, favtrips } = state; //arrivaldata from reducers/index.js
  return { tripdata, favtrips };
}

export default connect(mapStateToProps, { createFavTrip, fetchTrip })(TripEstimates);
