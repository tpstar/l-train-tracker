import React, { Component } from 'react';
import { HeaderBackButton } from 'react-navigation';
import { Card, Header } from './common';
import StopList from './StopList';

class StopListStack extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Create Favorite Stop",
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    }
  };
  render() {
    return (
      <Card>
        <StopList {...this.props }/>
      </Card>
    )
  }
}

export default StopListStack;
