import React, { Component } from 'react';
import { CardSection, Button } from './common';

class StopListItem extends Component {

  render() {
    const { trainstop, onButtonPress, trainline } = this.props;
    const trainLine = { name: trainline.name, textcolor: trainline.textcolor, destination: trainline.destination }; //remove stops from trainline
    return (
      <CardSection>
        <Button
           onPress={()=>onButtonPress(trainLine, trainstop)}
           overwriteTextStyle={{color: `${trainline.textcolor}`}}
           overwriteButtonStyle={{borderColor: `${trainline.name}`, backgroundColor: `${trainline.name}`}}
         >
           {trainstop.name}
        </Button>
      </CardSection>
    )
  }
}

export default StopListItem;
