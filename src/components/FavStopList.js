import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { FlatList, Text, Button, View } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CardSection } from './common';
import FavStopListItem from './FavStopListItem';

class FavStopList extends Component {

  onButtonPress(favstop) {
    console.log(this.props.navigation.state.key)
    const navigateAction = NavigationActions.navigate({
      routeName: 'ArrivalTimes',
      params: { favstop }
    });
    this.props.navigation.dispatch(navigateAction);
  }

  // static navigationOptions = ({ navigation }) => {
  //   const navigateToCreateFavStops = NavigationActions.navigate({
  //     routeName: 'LineList'
  //   });
  //   const addButton = (navigation) => {
  //     return (
  //       <MaterialIcons
  //         style={{padding: 5, color: '#3F51B5'}}
  //         name="add-circle"
  //         size={36}
  //         onPress={() => navigation.dispatch(navigateToCreateFavStops)}
  //       />
  //     )
  //   }
  //   const drawerButton = (navigation) => {
  //     console.log(navigation.state)
  //     return (
  //       <MaterialIcons
  //         style={{padding: 5, color: '#3F51B5'}}
  //         name="menu"
  //         size={36}
  //         onPress={() => {
  //           if (navigation.state.index === 0) {
  //             navigation.navigate('DrawerOpen')
  //           } else {
  //             navigation.navigate('DrawerClose')
  //           }
  //         }}
  //       />
  //
  //     )
  //   }
  //   return {
  //     title: "Favorite Stops",
  //     headerRight: addButton(navigation),
  //     headerLeft: drawerButton(navigation)
  //   }
  // };

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
  // console.log(favstops);
  return { favstops };
}

export default connect(mapStateToProps, {})(FavStopList);
