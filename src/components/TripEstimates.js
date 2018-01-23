import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { HeaderBackButton } from 'react-navigation';
import _ from 'lodash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Card, Header, Button, CardSection } from './common';
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

  onButtonPressSave(departureStop, arrivalStop, routeName) {
    console.log('I am onButtonPressSave');
    this.props.createFavTrip({ departureStop, arrivalStop, routeName });
    // this.props.navigation.dispatch(
    //   {
    //     type: 'Navigation/NAVIGATE',
    //     routeName: 'FavTripList',
    //   }
    // )
  }

  renderSaveButton(departureStop, arrivalStop, routeName) {
    // const renderButton = () => {
      console.log(departureStop, arrivalStop, routeName)
      return (
      <Button
        onPress={()=>this.onButtonPressSave(departureStop, arrivalStop, routeName)}
        // overwriteTextStyle={{color: `${trainline.textcolor}`}}
        // overwriteButtonStyle={{borderColor: `${trainline.name}`, backgroundColor: `${trainline.name}`}}
      >
        Save this Trip
      </Button>
    ) //}
    // if (_.isEmpty(favstops)) {
    //   return renderButton();
    // } else {
    //   const selectedStop = { trainline, trainstop, boundFor };
    //   // check if the stop is already in the list
    //   const favStopExists = favstops.some((favstop) => (
    //     favstop.trainline.name === selectedStop.trainline.name &&
    //     favstop.trainstop.name === selectedStop.trainstop.name &&
    //     favstop.boundFor.name === selectedStop.boundFor.name
    //   ))
    //   if (!favStopExists) { //if the selected stop does not exist in the fav stop list
    //     return renderButton()
    //   }
    // }
  }

  render() {
    const { tripdata } = this.props;
    const { departureStop, arrivalStop, routeName } = this.props.navigation.state.params;
    console.log( "is state to props called twice in render?", tripdata ) // once with empty object and once with object with data
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
          {this.renderSaveButton(departureStop, arrivalStop, routeName)}
        </CardSection>

      </Card>
    )
  }
}

const mapStateToProps = state => {
  const { tripdata } = state; //arrivaldata from reducers/index.js
  return { tripdata };
}

export default connect(mapStateToProps, { createFavTrip })(TripEstimates);
