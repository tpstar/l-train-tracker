import React, { Component } from 'react';
import { CardSection, Button } from './common';

class ArrivalTimeItem extends Component {

  render() {
    const { favstop, arrivaltime } = this.props;
    const { textcolor, name } = favstop.trainline;
    const waitingMin =
      Math.round(
        parseFloat(
          Date.parse(arrivaltime.arrT) - Date.parse(arrivaltime.prdt)
        )/60000
      )
    return (
      <CardSection>
        <Button
           // onPress={()=>onButtonPress()}
           overwriteTextStyle={{color: `${textcolor}`}}
           overwriteButtonStyle={{borderColor: `${name}`, backgroundColor: `${name}`}}
         >
           {favstop.destination.name} bound {waitingMin} min
        </Button>
      </CardSection>
    )
  }
}

export default ArrivalTimeItem;
