import React, { Component } from 'react';
import { Text } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { CardSection, Button } from './common';

class FavStopListItem extends Component {

  render() {
    const { favtrip, onButtonPress, onSlidePress } = this.props;
    const swipeBtns = [
      {
        text: 'DELETE',
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => onSlidePress(favtrip)
      }
    ];
    // console.log(favtrip)

    return (
      <Swipeout right={swipeBtns}
        backgroundColor= 'transparent'
        autoClose={true}
      >
        <CardSection>
          <Button
            onPress={()=>onButtonPress(favtrip)}
            overwriteTextStyle={{color: favtrip.route.textcolor}}
            overwriteButtonStyle={{borderColor: favtrip.route.primarycolor,
                                   backgroundColor: favtrip.route.primarycolor}}
          >
            <Text style={{color: favtrip.route.sectextcolor}}>
              From
            </Text>
            {' ' + favtrip.departureStop.name + ' '}
            <Text style={{color: favtrip.route.sectextcolor}}>
              To
            </Text>
            {' ' + favtrip.arrivalStop.name}
          </Button>
        </CardSection>
      </Swipeout>
    )
  }
}

export default FavStopListItem;
