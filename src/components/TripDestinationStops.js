import React, { Component } from 'react';
import { HeaderBackButton } from 'react-navigation';
import { View, FlatList } from 'react-native';
import _ from 'lodash';
import { trainLines } from '../data';
import { Card, Header } from './common';
import StopListItem from './StopListItem';

class TripDestinationStops extends Component {

  onButtonPress(trainline, trainstop) {
    // let routeTo = 'DirList';
    // let boundFor = '';
    // if (trainstop.stpId.L) { //console.log('You are in Loop!')
    //   // need to skip choosing direction
    //   routeTo = 'ArrivalTimes';
    //   boundFor = { direction: 'L', name: trainline.boundFor[3].name }
    //   // once you are in the Chicago loop, boundFor is the one opposite to L (e.g. Midway)
    //   // this.props.createFavStop({ trainline, trainstop, boundFor });
    //
    // } else {
    //   trainline.boundFor = _.pick(trainline.boundFor, [1, 5]); //remove boundFor[3]
    // }
    // this.props.navigation.dispatch(
    //   {
    //     type: 'Navigation/NAVIGATE',
    //     routeName: routeTo,
    //     params: { trainline, trainstop, boundFor }
    //   })
  }

  static navigationOptions = ({ navigation }) => {
    const { trainline, trainstop } = navigation.state.params.departure;
    // console.log(trainline)
    const lineName = _.capitalize(trainline.name)

    return {
      title: `${lineName} Line Stops`,
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    }
  };


  render() {
    const { trainline, trainstop, boundFor } = this.props.navigation.state.params.departure;
    const tripLine = trainLines.filter(
      line => line.name === trainline.name
    )[0] //[0] is to conver array into object element
    const tripLineStops = tripLine.stops;
    const tripStopIndex = tripLineStops.findIndex((stop) =>
      stop.staId === trainstop.staId
    )
    console.log(tripLine, boundFor);
    // const trainStops = trainline.stops;
    // const tripBoundForKey = Object.keys(tripLine.boundFor).find(key => tripLine.boundFor[key].name === boundFor.name)
    const tripBoundForKey = boundFor.key;
    const lStaArrayIndex = tripLine.boundFor[3].loopStartStaArrayIndex;
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
    console.log(tripLineStops, tripBoundForKey, tripStops);
    return (
      <Card>
        <Header headerText={"Choose Destination Stop"} />
        {/* <FlatList
          data={trainStops}
          renderItem={({ item }) => <StopListItem
                        trainstop={item}
                        onButtonPress={this.onButtonPress.bind(this)}
                        trainline={trainline}
                      />}
          keyExtractor={(item)=>item.staId}
        /> */}
      </Card>
    )
  }
}

export default TripDestinationStops;
