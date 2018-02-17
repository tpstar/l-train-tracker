import React, { Component } from 'react';
import { HeaderBackButton } from 'react-navigation';
import { FlatList } from 'react-native';
import { Card, CardSection, Button, Header } from './common';
import { trainLines } from '../data';
import LineListItem from './LineListItem';
import { NavigateTo } from './helper';

class LineList extends Component {

  onButtonPress(trainline) {
    this.props.navigation.dispatch(
      {
        type: 'Navigation/NAVIGATE',
        routeName: 'StopList',
        params: { trainline }
      }
    )
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "CTA Train Lines",
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
      // headerLeft: NavigateTo(navigation, 'navigate-before', 'FavStopList')
                           // navigation, material icon name, route name
    }
  };
  render() {
    return (
      <Card>
        <Header
          headerText={"Choose Train Line"}
          overwriteTextStyle={{color: '#212121', fontWeight: 'bold'}}
        />
        <FlatList
          data={trainLines}
          renderItem={({item}) => <LineListItem trainline={item} onButtonPress={this.onButtonPress.bind(this)}/>}
          keyExtractor={(item)=>item.name}
        />
      </Card>
    )
  }
}

export default LineList;
