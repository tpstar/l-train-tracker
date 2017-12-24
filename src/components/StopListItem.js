import React, { Component } from 'react';
import { CardSection, Button } from './common';

class StopListItem extends Component {

  render() {
    const { trainstop, onButtonPress, trainlineName, trainlineText } = this.props;
    return (
      <CardSection>
        <Button
           onPress={()=>onButtonPress(trainstop)}
           overwriteTextStyle={{color: `${trainlineText}`}}
           overwriteButtonStyle={{borderColor: `${trainlineName}`, backgroundColor: `${trainlineName}`}}
         >
           {trainstop}
        </Button>
      </CardSection>
    )
  }
}

export default StopListItem;
