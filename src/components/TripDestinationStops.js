import React, { Component } from 'react';
import { HeaderBackButton } from 'react-navigation';
import { View, FlatList } from 'react-native';
import _ from 'lodash';
import { trainLines } from '../data';
import { Card, Header } from './common';
import StopListItem from './StopListItem';
import TripEstimates from './TripEstimates';

class TripDestinationStops extends Component {

  onButtonPress(trainline, arrivalStop){
    const departureStop = this.props.navigation.state.params.departure.trainstop;
    const { boundFor } = this.props.navigation.state.params.departure;
    console.log(trainline, departureStop, boundFor, arrivalStop)
  //need to create action, check arrivalTimes.js and in there check createFavStop
    this.props.navigation.dispatch(
      {
        type: 'Navigation/NAVIGATE',
        routeName: 'TripEstimates', //analoguous to arrivalTimes, use AppNavigator.js to route to TripEstimates
        params: { trainline, departureStop, boundFor, arrivalStop }
      })
  }

  createPossibleDestinationStopList = ({ trainline, trainstop, boundFor }) => { //create possible destination stop list
    const tripLine = trainLines.filter( //find the right route
      line => line.name === trainline.name
    )[0] //[0] is to conver array into object element
    const tripLineStops = tripLine.stops;
    const tripStopIndex = tripLineStops.findIndex((stop) =>
      stop.staId === trainstop.staId
    )
    // console.log(tripLine, boundFor);
    const tripBoundForKey = boundFor.key;

    let lStaArrayIndex = -1;
    if (tripLine.boundFor[3]) { //if the departure is one of the stops in the loop line
      lStaArrayIndex = tripLine.boundFor[3].loopStartStaArrayIndex;
    }
    console.log(lStaArrayIndex)
    var tripStops = [];
    if (tripBoundForKey === 1) {
      tripStops = tripLineStops.slice(0, tripStopIndex).reverse()
    } else if (tripBoundForKey === 3) { //if the departure is in the loop
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
    // console.log(tripLineStops, tripBoundForKey, tripStops);
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

export default TripDestinationStops;
