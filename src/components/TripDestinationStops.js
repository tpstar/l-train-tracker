import React, { Component } from 'react';
import { HeaderBackButton } from 'react-navigation';
import { View, FlatList } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
// import { trainLines } from '../data';
import { Card, Header } from './common';
import StopListItem from './StopListItem';
import TripEstimates from './TripEstimates';
import { followThisTrain } from '../actions';

class TripDestinationStops extends Component {

  onButtonPress(trainline, arrivalStop){
    const { trainstop, boundFor, arrivaltime } = this.props.navigation.state.params.departure;
    const departureStop = trainstop;
    // console.log(arrivaltime, departureStop, arrivalStop)
    const runnumber = arrivaltime.rn;
    // console.log(arrivaltime.rn)


    this.props.navigation.dispatch(
      {
        type: 'Navigation/NAVIGATE',
        routeName: 'TripEstimates', //analoguous to arrivalTimes, use AppNavigator.js to route to TripEstimates
        params: { trainline, departureStop, boundFor, arrivalStop }
      })
    this.props.followThisTrain({ runnumber, departureStop, arrivalStop, departureStopArrivaltime: arrivaltime});

  }

  createPossibleDestinationStopList = ({ trainline, trainstop, boundFor }) => { //create possible destination stop list
    const tripLineStops = trainline.stops;
    const tripStopIndex = tripLineStops.findIndex((stop) =>
      stop.staId === trainstop.staId
    )
    // console.log(tripLine, boundFor);
    const tripBoundForKey = boundFor.key;
    var tripStops = [];
    if (tripBoundForKey === 1) {
      tripStops = tripLineStops.slice(0, tripStopIndex).reverse()
    } else if (tripBoundForKey === 3) { //if the departure is in the loop
      // let lStaArrayIndex = -1;
      // if (tripLine.boundFor[3]) { //if the departure is one of the stops in the loop line
      let lStaArrayIndex = trainline.boundFor[3].loopStartStaArrayIndex;
      // }
      tripStops = [...tripLineStops.slice(tripStopIndex + 1),
                   ...tripLineStops.slice(0, lStaArrayIndex).reverse()]
    } else if (tripBoundForKey === 5) {
      tripStops = tripLineStops.slice(tripStopIndex + 1)
    }
    return tripStops;
  }

  static navigationOptions = ({ navigation }) => {
    const { trainline, trainstop } = navigation.state.params.departure;
    // console.log(trainline)
    const lineName = _.capitalize(trainline.name)

    return {
      title: `Stops from ${trainstop.name}`,
      // headerTitleStyle: { color: 'red'},
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    }
  };


  render() {
    const { trainline, trainstop, boundFor } = this.props.navigation.state.params.departure;
    const tripStops = this.createPossibleDestinationStopList({ trainline, trainstop, boundFor });
    return (
      <Card>
        <Header headerText={"Choose Destination Stop"} />
        <FlatList
          data={tripStops}
          renderItem={({ item }) => <StopListItem
                        trainstop={item}
                        onButtonPress={this.onButtonPress.bind(this)}
                        trainline={trainline}
                      />}
          keyExtractor={(item)=>item.staId}
        />
      </Card>
    )
  }
}

export default connect(null, { followThisTrain })(TripDestinationStops);
