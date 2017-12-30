import React, { Component } from 'react';
import { CardSection, Button } from './common';

class FavStopListItem extends Component {

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
          {favstop.trainstop.name} ({favstop.destination.name} bound)
        </Button>
      </CardSection>
    )
  }
}

export default FavStopListItem;
