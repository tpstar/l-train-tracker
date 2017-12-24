import React, { Component } from 'react';
import { CardSection, Button } from './common';

class ListItem extends Component {

  render() {
    const { trainline, onButtonPress } = this.props;
    return (
      <CardSection>
        <Button
          onPress={()=>onButtonPress(trainline.name)}
          overwriteTextStyle={{color: `${trainline.textcolor}`}}
          overwriteButtonStyle={{borderColor: `${trainline.name}`, backgroundColor: `${trainline.name}`}}
        >
          {trainline.name.charAt(0).toUpperCase() + trainline.name.slice(1)}
        </Button>
      </CardSection>
    )
  }
}

export default ListItem;
