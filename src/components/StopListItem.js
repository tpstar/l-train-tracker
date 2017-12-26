import React, { Component } from 'react';
import { CardSection, Button } from './common';

class StopListItem extends Component {

  render() {
    const { trainstopName, onButtonPress, trainline, trainstopIndex } = this.props;
    const trainstop = { name: trainstopName, index: trainstopIndex };
    return (
      <CardSection>
        <Button
           onPress={()=>onButtonPress(trainline, trainstop)}
           overwriteTextStyle={{color: `${trainline.textcolor}`}}
           overwriteButtonStyle={{borderColor: `${trainline.name}`, backgroundColor: `${trainline.name}`}}
         >
           {trainstopName}
        </Button>
      </CardSection>
    )
  }
}

export default StopListItem;
