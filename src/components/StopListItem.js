import React, { Component } from 'react';
import { CardSection, Button } from './common';

class StopListItem extends Component {

  render() {
    const { trainstop, onButtonPress, trainline } = this.props;
    return (
      <CardSection>
        <Button
           onPress={()=>onButtonPress(trainline, trainstop)}
           overwriteTextStyle={{color: `${trainline.textcolor}`}}
           overwriteButtonStyle={{borderColor: `${trainline.name}`, backgroundColor: `${trainline.name}`}}
         >
           {trainstop}
        </Button>
      </CardSection>
    )
  }
}

export default StopListItem;
