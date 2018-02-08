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
    // console.log(trainline, trainstop)
    let destinationStop = {...trainline.boundFor}
    if (trainline.boundFor[3]) {
      destinationStop = _.pick(destinationStop, [1, 5]); //remove boundFor[3]
    }

    return (
      <Card>
        <Header headerText={"Choose Direction"} />
        <FlatList
          data={Object.values(destinationStop)}
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
