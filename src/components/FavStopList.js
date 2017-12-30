import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { FlatList, Text, Button, View } from 'react-native';
import { CardSection } from './common';
import FavStopListItem from './FavStopListItem';

class FavStopList extends Component {

  onButtonPress(favstop) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'ArrivalTimes',
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
      routeName: 'LineList'
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
        data={this.props.favstops}
        renderItem={({ item })=><FavStopListItem favstop={item}
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
  const { favstops } = state; //favtrainsstops from reducers/index.js
  console.log(favstops);
  return { favstops };
}

export default connect(mapStateToProps, {})(FavStopList);
