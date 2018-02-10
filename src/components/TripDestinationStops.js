import React, { Component } from 'react';
import { HeaderBackButton } from 'react-navigation';
import { View, FlatList } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
// import { trainLines } from '../data';
import { Card, Header } from './common';
import StopListItem from './StopListItem';
import TripEstimates from './TripEstimates';
import { fetchFollowTrainAPIData } from '../actions';

class TripDestinationStops extends Component {

  onButtonPress(trainline, arrivalStop){
    const { trainstop, boundFor, arrivaltime } = this.props.navigation.state.params.departure;
    const departureStop = {...trainstop, boundFor};
    const route = { name: trainline.name, textcolor: trainline.textcolor, rt: trainline.rt};

    this.props.navigation.dispatch(
      {
        type: 'Navigation/NAVIGATE',
        routeName: 'TripEstimates',
        params: { departureStop, arrivalStop, route }
      })
    this.props.fetchFollowTrainAPIData({ departureStop, arrivalStop, departureStopArrivaltime: arrivaltime, routeName: trainline.name});

  }

  createPossibleDestinationStopList = ({ trainline, trainstop, boundFor, arrivaltime }) => { //create possible destination stop list
    const tripLineStops = trainline.stops;
    const tripStopIndex = tripLineStops.findIndex((stop) =>
      stop.staId === trainstop.staId
    )
    console.log(tripStopIndex);
    const tripBoundForKey = boundFor.key;
    var tripStops = [];
    if (tripBoundForKey === 1) { // if direction is the reverse of the stop list
      tripStops = tripLineStops.slice(0, tripStopIndex).reverse();
      if (arrivaltime.rt === "G" && tripStopIndex > 27) {
        //if the route is green line and depart from either Ashland or Halsted
        //Cottage Grove and King Drive need to be removed from the list
        if (tripStopIndex === 28) { //if departing from Halsted
          tripStops.splice(0, 2)
        } else if (tripStopIndex === 29) { //if departing from Ashland
          tripStops.splice(1, 2)
        }
      }
    } else if (tripBoundForKey === 3) { //if the departure is in the loop
      // let lStaArrayIndex = -1;
      // if (tripLine.boundFor[3]) { //if the departure is one of the stops in the loop line
      let lStaArrayIndex = trainline.boundFor[3].loopStartStaArrayIndex;
      // }
      tripStops = [...tripLineStops.slice(tripStopIndex + 1),
                   ...tripLineStops.slice(0, lStaArrayIndex).reverse()]
    } else if (tripBoundForKey === 5) {
      tripStops = tripLineStops.slice(tripStopIndex + 1);
      if (arrivaltime.rt === "G") {
        // if train route is Green line and if the train is heading South,
        // there are two branches, Cottage Grove and Ashland/63rd bound
        // choose one branch and stops on the other branch need to be removed from the list
        console.log("Green train heading South!!!", tripStops);
        if (arrivaltime.destSt === "30139") { //30139 is stpId for 'Cottage Grove'
          tripStops.splice(-2, 2);
        } else {
          if (tripStops.length > 3) { //to prevent removing 'Ashland/63rd' when 'Halsted' is departure stop
            tripStops.splice(-4, 2);
          }
        }
    }


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
    const { trainline, trainstop, boundFor, arrivaltime } = this.props.navigation.state.params.departure;
    const tripStops = this.createPossibleDestinationStopList({ trainline, trainstop, boundFor, arrivaltime });
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

export default connect(null, { fetchFollowTrainAPIData })(TripDestinationStops);
