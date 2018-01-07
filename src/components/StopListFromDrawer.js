import React, { Component } from 'react';
import { HeaderBackButton } from 'react-navigation';
import { Card, Header } from './common';
import StopList from './StopList';

class StopListFromDrawer extends Component {

  render() {
    console.log(this.props)
    return (
      <Card>
        <StopList {...this.props }/>
      </Card>
    )
  }
}

export default StopListFromDrawer;
