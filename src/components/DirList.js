import React, { Component } from 'react';
import { HeaderBackButton } from 'react-navigation';
import { FlatList } from 'react-native';
import _ from 'lodash';
import { Card, CardSection, Button, Header } from './common';
import DirListItem from './DirListItem';

class DirList extends Component {

  onButtonPress(boundFor) {
    const { trainline, trainstop } = this.props.navigation.state.params;
    this.props.navigation.dispatch(
      {
        type: 'Navigation/NAVIGATE',
        routeName: 'ArrivalTimes',
        params: { trainline, trainstop, boundFor }
      })
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Directions",
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    }
  };
  render() {
    const { trainline, trainstop } = this.props.navigation.state.params; //{trainline: "red"} from params in NavigationActions
    console.log(trainline, trainstop)
    let destinationStops = {...trainline.boundFor}
    if (trainline.boundFor[3]) {
      destinationStops = _.pick(destinationStops, [1, 5]); //remove boundFor[3]
    }
    console.log(destinationStops);
    if (trainstop.staId === trainline.stops[0].staId) {
      destinationStops[1].isTerminal = true;
    } else {
      destinationStops[1].isTerminal = false;
    }
    if (trainstop.staId === trainline.stops[trainline.stops.length - 1].staId) {
      destinationStops[5].isTerminal = true;
    } else {
      destinationStops[5].isTerminal = false;
    }

    return (
      <Card>
        <Header headerText={"Choose Direction"} />
        <FlatList
          data={Object.values(destinationStops)}
          renderItem={({item}) => <DirListItem
                        boundFor={item}
                        onButtonPress={this.onButtonPress.bind(this)}
                        trainline={trainline}
                        trainstop={trainstop}
                      />}
          keyExtractor={(item, index)=>index}
        />
      </Card>
    )
  }
}

export default DirList;
