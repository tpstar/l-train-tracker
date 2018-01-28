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

  renderError(tripdata) {
    if (tripdata.error) {
      return (
        <Header headerText={tripdata.error} overwriteTextStyle={{color: 'red'}}/>
      )
    }
  }

  renderDepartureTime(tripdata) {
    if (!tripdata.error && tripdata.tripDepartureTime) {
      return (
        <Header headerText={`at ${moment(tripdata.tripDepartureTime.arrT).format('h:mm a')}`} />
      )
    }
  }

  renderArrivalTime(tripdata) {
    if (!tripdata.error && tripdata.tripArrivalTime) {
      return (
        <Header headerText={`at ${moment(tripdata.tripArrivalTime.arrT).format('h:mm a')}`} />
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
    const { tripdata } = this.props;
    const { departureStop, arrivalStop, route } = this.props.navigation.state.params;
    // console.log( "is state to props called twice in render?", tripdata ) // once with empty object and once with object with data
    // let departureData = {};
    // let arrivalData = {};
    // if (tripdata.tripDepartureTime && tripdata.tripArrivalTime) { //when state to props is called with empty data tripdata.tripDepartureTime is false
    //   departureData = tripdata.tripDepartureTime;
    //   arrivalData = tripdata.tripArrivalTime;
    // }


    return (
      <Card>
        <Header headerText={`Departure: ${departureStop.name}`} />
        {this.renderDepartureTime(tripdata)}
        <Header headerText={`Arrival: ${arrivalStop.name}`} />
        {this.renderError(tripdata)}
        {this.renderArrivalTime(tripdata)}
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
