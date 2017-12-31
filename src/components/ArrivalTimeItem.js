import React, { Component } from 'react';
import { CardSection, Button } from './common';

class ArrivalTimeItem extends Component {

  render() {
    const { favstop, arrivaltime, currenttime } = this.props;
    const { textcolor, name } = favstop.trainline;
    console.log(textcolor, name);
    console.log(Math.round(parseFloat(Date.parse(arrivaltime.arrT)-Date.parse(currenttime))/60000))
    return (
      <CardSection>
        <Button
           // onPress={()=>onButtonPress()}
           overwriteTextStyle={{color: `${textcolor}`}}
           overwriteButtonStyle={{borderColor: `${name}`, backgroundColor: `${name}`}}
         >
           {favstop.destination.name} bound {Math.round(parseFloat(Date.parse(arrivaltime.arrT)-Date.parse(currenttime))/60000)}  mins ..!
        </Button>
      </CardSection>
    )
  }
}

export default ArrivalTimeItem;
