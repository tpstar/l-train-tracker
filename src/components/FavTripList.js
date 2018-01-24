import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, Button, View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CardSection } from './common';
import FavTripListItem from './FavTripListItem';
// import { deleteFavStop } from '../actions';
// import { NavigateTo } from './helper';

class FavTipList extends Component {

  onButtonPress(favtrip) {
  //   // console.log(favstop)
  //   const { trainline, trainstop, boundFor } = favstop;
  //
  //   this.props.navigation.dispatch(
  //     {
  //       type: 'Navigation/NAVIGATE',
  //       routeName: 'ArrivalTimes', //To FavStopList
  //       params: { trainline, trainstop, boundFor }
  //     }
  //   )
  }

  onSlidePress(favtrip) {
  //   this.props.deleteFavStop(favstop);
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
      title: "Favorite Trips",
      // headerRight: NavigateTo(navigation, 'search', 'LineList'), //NavigationActions.navigate({ routeName }) with Material icon name
                           // navigation, material icon name, route name
      headerLeft: drawerButton(navigation)
    }
  }

  render() {
    const { favtrips } = this.props;
    return (
      <View>
         <FlatList
           data={this.props.favtrips}
           renderItem={({ item })=><FavTripListItem
             favtrip={item}
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
  const { favtrips } = state; //favtrainsstops from reducers/index.js
  return { favtrips };
}

export default connect(mapStateToProps, {  })(FavTipList);
