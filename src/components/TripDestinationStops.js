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
    //   boundFor = { direction: 'L', name: trainline.boundFor.oppositeToL.name }
    //   // once you are in the Chicago loop, boundFor is the one opposite to L (e.g. Midway)
    //   // this.props.createFavStop({ trainline, trainstop, boundFor });
    //
    // } else {
    //   trainline.boundFor = _.pick(trainline.boundFor, [1, 5]); //remove boundFor.oppositeToL
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
    )
    const tripStops = tripLine[0].stops;
    const tripStopIndex = tripStops.findIndex((stop) =>
      stop.staId === trainstop.staId
    )
    console.log(tripStopIndex, boundFor);
    // const trainStops = trainline.stops;

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
