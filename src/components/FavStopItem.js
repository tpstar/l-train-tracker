import React, { Component } from 'react';
import { CardSection, Button } from './common';

class FavStopItem extends Component {

  render() {
    const { favstop, onButtonPress } = this.props;
    return (
      <CardSection>
        <Button
          onPress={()=>onButtonPress(favstop)}
          overwriteTextStyle={{color: `${favstop.trainline.textcolor}`}}
          overwriteButtonStyle={{borderColor: `${favstop.trainline.name}`,
                                 backgroundColor: `${favstop.trainline.name}`}}
        >
          {favstop.trainstop.name}  -  {favstop.destination.direction} ({favstop.destination.name})
        </Button>
      </CardSection>
    )
  }
}

export default FavStopItem;
