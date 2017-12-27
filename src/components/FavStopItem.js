import React, { Component } from 'react';
import { CardSection, Button } from './common';

class FavStopItem extends Component {

  render() {
    const { favstop, navigation } = this.props;
    console.log(favstop)
    return (
      <CardSection>
        <Button
          onPress={()=>onButtonPress(destination)}
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
