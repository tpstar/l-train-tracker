import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { FlatList, Text, Button, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
  // the header was moved to FavStopList's parent stackNavigator 'DrawerNavigation'

  // static navigationOptions = {
  //   drawerLabel: 'Favorite Stops',
  //   drawerIcon: () => (
  //     <MaterialIcons
  //       style={{width: 40, height: 40, borderRadius: 15}}
  //       name={'place'}
  //       size={36}
  //     />
  //   )
  // }
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
