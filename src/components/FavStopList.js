import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { FlatList, Text, Button, View } from 'react-native';
import { CardSection } from './common';
import FavStopListItem from './FavStopListItem';


class FavStopList extends Component {

  onButtonPress(favstop) {
    const { trainline, trainstop, destination } = favstop
    const navigateAction = NavigationActions.navigate({
      routeName: 'ArrivalTimes',
      params: { trainline, trainstop, destination }
    });
    this.props.navigation.dispatch(navigateAction);
  }

  //header is in navigation/AppNavigator

  render() {
    return (
      <View>
      <Text style={styles.titleStyle}>
        Hello
      </Text>
      <FlatList
        data={this.props.favstops}
        renderItem={({ item })=><FavStopListItem
          favstop={item}
          onButtonPress={this.onButtonPress.bind(this)}
        />}
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
  return { favstops };
}

export default connect(mapStateToProps, {})(FavStopList);
