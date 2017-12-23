import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { CardSection } from './common';

class FavoriteStops extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Favorite Stops",
      // headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    }
  };

  render() {

    return (
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              Roosebelt
            </Text>
          </CardSection>
        </View>
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
