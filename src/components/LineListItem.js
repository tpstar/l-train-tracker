import React, { Component } from 'react';
import _ from 'lodash';
import { CardSection, Button } from './common';

class LineListItem extends Component {

  render() {
    const { trainline, onButtonPress } = this.props;
    return (
      <CardSection>
        <Button
          onPress={()=>onButtonPress(trainline)}
          overwriteTextStyle={{color: trainline.textcolor}}
          overwriteButtonStyle={{borderColor: trainline.primarycolor, backgroundColor: trainline.primarycolor}}
        >
          {_.capitalize(trainline.name)}
        </Button>
      </CardSection>
    )
  }
}

export default LineListItem;
