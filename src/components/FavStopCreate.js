import React, { Component } from 'react';
import { HeaderBackButton, NavigationActions } from 'react-navigation';
import { FlatList } from 'react-native';
import { Card, CardSection, Button, Header } from './common';
import { trainLines } from '../data'
import LineListItem from './LineListItem';

class FavStopCreate extends Component {

  onButtonPress(trainline) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'StopList',
      params: { trainline }
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
    return (
      <Card>
        <Header headerText={"Choose Train Line"} />
        <FlatList
          data={trainLines}
          renderItem={({item}) => <LineListItem trainline={item} onButtonPress={this.onButtonPress.bind(this)}/>}
          keyExtractor={(item)=>item.name}
        />
      </Card>
    )
  }
}

export default FavStopCreate;
