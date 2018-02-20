import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, Button, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CardSection } from './common';
import FavStopListItem from './FavStopListItem';
import { deleteFavStop } from '../actions';
import { NavigateTo } from './helper';

class FavStopList extends Component {

  onButtonPress(favstop) {
    // console.log(favstop)
    const { trainline, trainstop, boundFor } = favstop;

    this.props.navigation.dispatch(
      {
        type: 'Navigation/NAVIGATE',
        routeName: 'ArrivalTimes',
        params: { trainline, trainstop, boundFor }
      }
    )
  }

  onSlidePress(favstop) {
    this.props.deleteFavStop(favstop);
  }

  static navigationOptions = ({ navigation }) => {
    const drawerButton = (navigation) => {
      return (
        <MaterialIcons
          style={{padding: 5, color: '#3F51B5'}}
          name="menu"
          size={36}
          onPress={() => { navigation.navigate('DrawerToggle')}}
        />
      )
    }
    return {
      title: "Favorite Stops",
      headerRight: NavigateTo(navigation, 'search', 'LineList'), //NavigationActions.navigate({ routeName }) with Material icon name
                           // navigation, material icon name, route name
      headerLeft: drawerButton(navigation)
    }
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.props.favstops}
          renderItem={({ item })=><FavStopListItem
            favstop={item}
            onButtonPress={this.onButtonPress.bind(this)}
            onSlidePress={this.onSlidePress.bind(this)}
          />}
          keyExtractor={(item, index)=>index}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  const { favstops } = state; //favtrainsstops from reducers/index.js
  return { favstops };
}

export default connect(mapStateToProps, { deleteFavStop })(FavStopList);
