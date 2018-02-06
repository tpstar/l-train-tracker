import React, { Component } from 'react';
// import { Icon } from 'react-native-elements';
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
            overwriteTextStyle={{color: `${favtrip.route.textcolor}`}}
            overwriteButtonStyle={{borderColor: `${favtrip.route.name}`,
                                   backgroundColor: `${favtrip.route.name}`}}
          >
            From {favtrip.departureStop.name} To {favtrip.arrivalStop.name}
          </Button>
        </CardSection>
      </Swipeout>
    )
  }
}

export default FavStopListItem;
