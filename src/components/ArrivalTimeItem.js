import React, { Component } from 'react';
import moment from 'moment';
import { CardSection, Button } from './common';

class ArrivalTimeItem extends Component {

  render() {
    const { trainline, boundFor, arrivaltime, onButtonPress } = this.props;
    // console.log('arrivaltime: ',arrivaltime);
    const { textcolor, name } = trainline;
    const waitingMin =
      Math.round(
        parseFloat(
          moment(arrivaltime.arrT).diff(moment(arrivaltime.prdt))
        )/60/1000 //milliseconds to minutes
      )
    return (
      <CardSection>
        <Button
           onPress={()=>onButtonPress(arrivaltime)}
           overwriteTextStyle={{color: `${textcolor}`}}
           overwriteButtonStyle={{borderColor: `${name}`, backgroundColor: `${name}`}}
         >
           {waitingMin} min
        </Button>
      </CardSection>
    )
  }
}

export default ArrivalTimeItem;
