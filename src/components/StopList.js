import React, { Component } from 'react';
import { HeaderBackButton, NavigationActions } from 'react-navigation';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Card, CardSection, Button, Header } from './common';
import StopListItem from './StopListItem';
import { createFavStop } from '../actions';

class StopList extends Component {

  onButtonPress(trainline, trainstop) {
    console.log(trainline, trainstop)
    let routeTo = 'DirList';
    if (trainstop.stpId.L) { //console.log('You are in Loop!')
      // need to skip choosing direction
      routeTo = 'FavStopList';
      const destination = { direction: 'L', name: trainline.destination.oppositeToL.name}
      // once you are in the Chicago loop, destination is the one opposite to L (e.g. Midway)
      this.props.createFavStop({ trainline, trainstop, destination });
    }
    trainline.destination = _.pick(trainline.destination, [1, 5]); //remove destination.oppositeToL 
    const navigateAction = NavigationActions.navigate({
      routeName: routeTo,
      params: { trainline, trainstop }
    })
    this.props.navigation.dispatch(navigateAction);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Create Favorite Stop",
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    }
  };
  render() {
    const { trainline } = this.props.navigation.state.params; //{trainline: "red"} from params in NavigationActions
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

export default connect(null, { createFavStop })(StopList);
