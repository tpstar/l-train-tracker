import React, { Component } from 'react';
import { HeaderBackButton } from 'react-navigation';
import _ from 'lodash';
import { Card, Header } from './common';
import StopList from './StopList';

class StopListStack extends Component {

  static navigationOptions = ({ navigation }) => {
    const { trainline } = navigation.state.params;
    const lineName = _.capitalize(trainline.name)
    return {
      title: `${lineName} Line Stops`,
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
