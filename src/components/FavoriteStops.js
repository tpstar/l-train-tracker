import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Text, Button } from 'react-native';
import { CardSection } from './common';

class FavoriteStops extends Component {

  static navigationOptions = ({ navigation }) => {
    const navigateToCreateFavStops = NavigationActions.navigate({
      routeName: 'FavStopCreate'
    })
    return {
      title: "Favorite Stops",
      headerRight: <Button title="Add" onPress={() => navigation.dispatch(navigateToCreateFavStops)}/>
    }
  };

  render() {

    return (
      <CardSection>
        <Text style={styles.titleStyle}>
          Roosebelt
        </Text>
      </CardSection>
    )
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
}

export default FavoriteStops;
