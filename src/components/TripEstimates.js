import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { HeaderBackButton } from 'react-navigation';
import _ from 'lodash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Card, Header, Button, CardSection, Spinner } from './common';
import { createFavTrip } from '../actions';

import { NavigateTo } from './helper';

class TripEstimates extends Component {

  renderError(error) {
    if (error) {
      return (
        <Header headerText={error} overwriteTextStyle={{color: 'red'}}/>
      )
    }
  }

  renderTime(time, error) {
    // console.log(_.isEmpty(time));
    if (!error && !_.isEmpty(time)) { //if there is no error and if the arrival time data object is not empty render time
      let arrTime = moment(time.arrT);
      let seconds = arrTime.second()
      if (Math.round(seconds/60) === 1) { //round up to minutes
        arrTime = moment(arrTime).add(1, 'minutes')
      }
      return (
        <Header
          overwriteTextStyle={{color: '#3F51B5', fontWeight: 'bold'}}
          secondaryText='at '
          headerText={arrTime.format('h:mm a')}
        />
      )
    } else {
      return (
        <Header headerText={'Loading...'} />
      )
    }
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
    return {
      title: "Trip Estimates",
      headerRight: NavigateTo(navigation, 'search', 'LineList'), //NavigationActions.navigate({ routeName }) with Material icon name
                           // navigation, material icon name, route name
      headerLeft: drawerButton(navigation)
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
        // overwriteTextStyle={{color: `${trainline.textcolor}`}}
        // overwriteButtonStyle={{borderColor: `${trainline.name}`, backgroundColor: `${trainline.name}`}}
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
    const { tripDepartureTime, tripArrivalTime, error } = this.props.tripdata;
    const { departureStop, arrivalStop, route } = this.props.navigation.state.params;
    // console.log( "is state to props called twice in render?", tripdata ) // once with empty object and once with object with data
    // console.log('tripDepartureTime: ', tripDepartureTime, 'tripArrivalTime: ', tripArrivalTime);
    return (
      <Card>
        <Header
          secondaryText='Departure: '
          headerText={departureStop.name}
          overwriteTextStyle={{color: '#3F51B5', fontWeight: 'bold'}}
        />
        {this.renderTime(tripDepartureTime, error)}
        <Header
          secondaryText='Arrival: '
          headerText={arrivalStop.name}
          overwriteTextStyle={{color: '#3F51B5', fontWeight: 'bold'}}
        />
        {this.renderError(error)}
        {this.renderTime(tripArrivalTime, error)}
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

export default connect(mapStateToProps, { createFavTrip })(TripEstimates);
