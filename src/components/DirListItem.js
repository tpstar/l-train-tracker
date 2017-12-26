import React, { Component } from 'react';
import { CardSection, Button } from './common';

class DirListItem extends Component {

  render() {
    const { destination, trainline, onButtonPress, trainstop } = this.props;
    return (
      <CardSection>
        <Button
          onPress={()=>onButtonPress(destination)}
          overwriteTextStyle={{color: `${trainline.textcolor}`}}
          overwriteButtonStyle={{borderColor: `${trainline.name}`, backgroundColor: `${trainline.name}`}}
        >
          {destination.name}
        </Button>
      </CardSection>
    )
  }
}

export default DirListItem;
