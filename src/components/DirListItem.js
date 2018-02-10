import React, { Component } from 'react';
import { CardSection, Button } from './common';

class DirListItem extends Component {

  render() {
    const { boundFor, trainline, onButtonPress, trainstop } = this.props;
    let terminalArrival = '';
    if (boundFor.isTerminal) {
      terminalArrival = ' (Terminal Arrival)';
    }
    return (
      <CardSection>
        <Button
          onPress={()=>onButtonPress(boundFor)}
          overwriteTextStyle={{color: trainline.textcolor}}
          overwriteButtonStyle={{borderColor: trainline.name, backgroundColor: trainline.name}}
        >
          {boundFor.name} {terminalArrival}
        </Button>
      </CardSection>
    )
  }
}

export default DirListItem;
