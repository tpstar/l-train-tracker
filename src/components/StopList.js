import React, { Component } from 'react';
import { HeaderBackButton, NavigationActions } from 'react-navigation';
import { FlatList } from 'react-native';
import { Card, CardSection, Button, Header } from './common';
import StopListItem from './StopListItem';

class StopList extends Component {

  onButtonPress(trainline, trainstop) {
    // console.log(trainline, trainstop)
    const navigateAction = NavigationActions.navigate({
      routeName: 'DirList',
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
          renderItem={({item}) => <StopListItem
                        trainstop={item}
                        onButtonPress={this.onButtonPress.bind(this)}
                        trainline={trainline}
                      />}
          keyExtractor={(item, index)=>index}
        />
      </Card>
    )
  }
}

export default StopList;
