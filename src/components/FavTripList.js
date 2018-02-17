import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, Button, View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CardSection } from './common';
import FavTripListItem from './FavTripListItem';
import { fetchTrip, deleteFavTrip } from '../actions';
// import { NavigateTo } from './helper';

class FavTipList extends Component {

  onButtonPress(favtrip) {
    // console.log(favtrip)
    const { departureStop, arrivalStop, route } = favtrip;

    this.props.navigation.dispatch(
      {
        type: 'Navigation/NAVIGATE',
        routeName: 'TripEstimates',
        params: { departureStop, arrivalStop, route }
      }
    )
    // console.log(departureStop, arrivalStop)
    // this.props.fetchTrip({ departureStop, arrivalStop, departureStopArrivaltime: arrivaltime, routeName: trainline.name})
    this.props.fetchTrip({ departureStop, arrivalStop, route })
  }

  onSlidePress(favtrip) {
    this.props.deleteFavTrip(favtrip);
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

export default connect(mapStateToProps, { fetchTrip, deleteFavTrip })(FavTipList);
