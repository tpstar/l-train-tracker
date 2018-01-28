import React, { Component } from 'react';
import { HeaderBackButton } from 'react-navigation';
import { View, FlatList } from 'react-native';
import _ from 'lodash';
import { Card, Header } from './common';
import StopListItem from './StopListItem';

class StopList extends Component {

  onButtonPress(trainline, trainstop) {
    console.log(trainline.boundFor[3])
    let routeTo = 'DirList';
    let boundFor = '';
    if (trainstop.stpId.L) { //console.log('You are in Loop!')
      // need to skip choosing direction
      routeTo = 'ArrivalTimes';
      boundFor = { name: trainline.boundFor[3].name, direction: 'L', key: 3}
      // once you are in the Chicago loop, boundFor is the one opposite to L (e.g. Midway)
      // and key was set to "3"
      // this.props.createFavStop({ trainline, trainstop, boundFor });

    } else {
      trainline.boundFor = _.pick(trainline.boundFor, [1, 5]); //remove boundFor[3]
    }
    this.props.navigation.dispatch(
      {
        type: 'Navigation/NAVIGATE',
        routeName: routeTo,
        params: { trainline, trainstop, boundFor }
      })
  }

  static navigationOptions = ({ navigation }) => {
    const { trainline } = navigation.state.params;
    // console.log(trainline)
    const lineName = _.capitalize(trainline.name)

    return {
      title: `${lineName} Line Stops`,
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    }
  };


  render() {
    const { trainline } = this.props.navigation.state.params;
    const trainStops = trainline.stops;

    return (
      <Card>
        <Header headerText={"Choose Stop"} />
        <FlatList
          data={trainStops}
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

export default StopList;
