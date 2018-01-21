import React, { Component } from 'react';
// import { Icon } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { CardSection, Button } from './common';

class FavStopListItem extends Component {

  render() {
    const { favstop, onButtonPress, onSlidePress } = this.props;
    const swipeBtns = [
      {
        text: 'DELETE',
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => onSlidePress(favstop)
      }
    ];

    return (
      <Swipeout right={swipeBtns}
        backgroundColor= 'transparent'
        autoClose={true}
      >
        <CardSection>
          <Button
            onPress={()=>onButtonPress(favstop)}
            overwriteTextStyle={{color: `${favstop.trainline.textcolor}`}}
            overwriteButtonStyle={{borderColor: `${favstop.trainline.name}`,
                                   backgroundColor: `${favstop.trainline.name}`}}
          >
            {favstop.trainstop.name} ({favstop.boundFor.name} bound)
          </Button>
        </CardSection>
      </Swipeout>
    )
  }
}

export default FavStopListItem;
