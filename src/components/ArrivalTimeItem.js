import React, { Component } from 'react';
import moment from 'moment';
import { Text } from 'react-native';
import { CardSection, Button } from './common';
import { waitingMin } from './helper';

class ArrivalTimeItem extends Component {

  render() {
    const { trainline, boundFor, arrivaltime, onButtonPress } = this.props;
    // console.log('arrivaltime: ',arrivaltime);
    const { name, textcolor, sectextcolor } = trainline;

    let arrTime = moment(arrivaltime.arrT);
    console.log(arrTime)
    let seconds = arrTime.second()
    if (Math.round(seconds/60) === 1) { //round up to minutes
      arrTime = moment(arrTime).add(1, 'minutes')
    }

    return (
      <CardSection>
        <Button
           onPress={()=>onButtonPress(arrivaltime)}
           overwriteTextStyle={{color: textcolor, fontSize: 20}}
           overwriteButtonStyle={{borderColor: name, backgroundColor: name}}
         >
           {waitingMin(arrivaltime)} min {'     '}
           <Text style={{color: sectextcolor}}>
             {arrTime.format('h:mm a')}
           </Text>
        </Button>
      </CardSection>
    )
  }
}

export default ArrivalTimeItem;
