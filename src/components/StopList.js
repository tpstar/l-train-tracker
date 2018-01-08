import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Header } from './common';
import StopListItem from './StopListItem';
import { createFavStop } from '../actions';

class StopList extends Component {
  onButtonPress(trainline, trainstop) {
    let routeTo = 'DirList';
    let destination = '';
    if (trainstop.stpId.L) { //console.log('You are in Loop!')
      // need to skip choosing direction
      routeTo = 'ArrivalTimes';
      destination = { direction: 'L', name: trainline.destination.oppositeToL.name}
      // once you are in the Chicago loop, destination is the one opposite to L (e.g. Midway)
      // this.props.createFavStop({ trainline, trainstop, destination });

    } else {
      trainline.destination = _.pick(trainline.destination, [1, 5]); //remove destination.oppositeToL
    }
    const navigateAction = NavigationActions.navigate({
      routeName: routeTo,
      params: { trainline, trainstop, destination }
    })
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    // console.log(this.props.trainline);
    const { trainline } = this.props.navigation.state.params;
    // trainline can come from linelist or from redlist in drawer stack
    //{name: "red", ...} from params in NavigationActions
    const trainStops = trainline.stops;

    return (
      <View style={{flex: 1}}>
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
      </View>
    )
  }
}

export default connect(null, { createFavStop })(StopList);
