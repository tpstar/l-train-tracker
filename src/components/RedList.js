import React, { Component } from 'react';
import { HeaderBackButton } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Card, Header } from './common';
import StopList from './StopList';
import { trainLines } from '../data'

class RedList extends Component {

  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: "Create Favorite Stop",
  //     headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
  //   }
  // };

  static navigationOptions = {
    drawerLabel: 'Red Line',
    drawerIcon: () => (
      <MaterialIcons
        style={{width: 38, height: 40, borderRadius: 15, color: 'red'}}
        name={'train'}
        size={36}
      />
    )
  }

  render() {
    return (
      <Card>
        <StopList trainline={{trainline: trainLines[0]}}/>
      </Card>
    )
  }
}

export default RedList;
