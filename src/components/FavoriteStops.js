import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { FlatList, Text, Button, View } from 'react-native';
import { CardSection } from './common';
import FavStopItem from './FavStopItem';

class FavoriteStops extends Component {

  onButtonPress(favstop) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'FavStop',
      params: { favstop }
    });
    this.props.navigation.dispatch(navigateAction);
    // const { trainline, trainstop } = this.props.navigation.state.params;
    //
    // this.props.createFavStop({ trainline, trainstop, destination });
    // // console.log(trainline, trainstop, destination);
  }

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
      <View>
      <Text style={styles.titleStyle}>
        Hello
      </Text>
      <FlatList
        data={this.props.favtrainstops}
        renderItem={({ item })=><FavStopItem favstop={item}
                                             onButtonPress={this.onButtonPress.bind(this)}/>}
        keyExtractor={(item, index)=>index}
      />
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

const mapStateToProps = state => {
  const { favtrainstops } = state; //favtrainsstops from reducers/index.js
    console.log(favtrainstops);
  return { favtrainstops };
}

export default connect(mapStateToProps, {})(FavoriteStops);
