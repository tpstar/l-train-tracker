import React, { Component } from 'react';
import moment from 'moment';
import { Text } from 'react-native';
import { CardSection, Button } from './common';
import { waitingMin } from './helper';

class ArrivalTimeItem extends Component {

  renderDestStop(arrivaltime) {
    const { sectextcolor } = this.props.trainline;
    if (arrivaltime.rt === "G" && arrivaltime.trDr === "5") {
      return (
        <Text style={{color: sectextcolor}}>
          {'   '}
          {arrivaltime.destNm} bound
        </Text>
      )
    }
  }

  render() {
    const { trainline, boundFor, arrivaltime, onButtonPress } = this.props;
    // console.log('arrivaltime: ',arrivaltime);
    const { primarycolor, textcolor, sectextcolor } = trainline;

    let arrTime = moment(arrivaltime.arrT);
    let seconds = arrTime.second()
    if (Math.round(seconds/60) === 1) { //round up to minutes
      arrTime = moment(arrTime).add(1, 'minutes')
    }

    return (
      <CardSection>
        <Button
           onPress={()=>onButtonPress(arrivaltime)}
           overwriteTextStyle={{color: textcolor, fontSize: 19}}
           overwriteButtonStyle={{borderColor: primarycolor, backgroundColor: primarycolor}}
         >
           {waitingMin(arrivaltime)} min {'     '}
           <Text style={{color: sectextcolor}}>
             {arrTime.format('h:mm a')}
           </Text>
           {this.renderDestStop(arrivaltime)}
        </Button>
      </CardSection>
    )
  }
}

export default ArrivalTimeItem;
