import React, { Component } from 'react';
import { View } from 'react-native';
import { CardSection, Button } from './common';

class StopListItem extends Component {

  render() {
    const { trainstop, onButtonPress, trainline } = this.props;
    return (
      <CardSection>
        <Button
           onPress={()=>onButtonPress(trainline, trainstop)}
           overwriteTextStyle={{color: trainline.textcolor}}
           overwriteButtonStyle={{borderColor: trainline.primarycolor, backgroundColor: trainline.primarycolor}}
         >
           {trainstop.name}
        </Button>
      </CardSection>
    )
  }
}

export default StopListItem;
