import React, { Component } from 'react';
import moment from 'moment';
import { Text } from 'react-native';
import { CardSection, Button } from './common';
import { waitingMin } from './helper';

class ArrivalTimeItem extends Component {

  render() {
    const { trainline, boundFor, arrivaltime, onButtonPress } = this.props;
    // console.log('arrivaltime: ',arrivaltime);
    const { textcolor, name } = trainline;

    return (
      <CardSection>
        <Button
           onPress={()=>onButtonPress(arrivaltime)}
           overwriteTextStyle={{color: `${textcolor}`}}
           overwriteButtonStyle={{borderColor: `${name}`, backgroundColor: `${name}`}}
         >
           {waitingMin(arrivaltime)} min {'   '}
           <Text style={{color: '#37474f'}}>
             {moment(arrivaltime.arrT).format('h:mm a')}
           </Text>
        </Button>
      </CardSection>
    )
  }
}

export default ArrivalTimeItem;
