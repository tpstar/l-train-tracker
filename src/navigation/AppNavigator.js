import React from 'react';
import { StackNavigator, DrawerNavigator, NavigationActions } from "react-navigation";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FavStopList from '../components/FavStopList';
import LineList from '../components/LineList';
import StopList from '../components/StopList';
import DirList from '../components/DirList';
import ArrivalTimes from '../components/ArrivalTimes';

const DrawerStack = DrawerNavigator({
  FavStopList: { screen: FavStopList },
});

const DrawerNavigation = StackNavigator({
  //to build a header for the DrawerNavigation pages
  DrawerStack: { screen: DrawerStack }
}, {  //followings are the header for pages with menu button to open the drawer stack
  headerMode: 'float',
  navigationOptions: ({ navigation }) => {
    const navigateToCreateFavStops = NavigationActions.navigate({
      routeName: 'LineList'
    });
    const addButton = (navigation) => {
      return (
        <MaterialIcons
          style={{padding: 5, color: '#3F51B5'}}
          name="add-circle"
          size={36}
          onPress={() => navigation.dispatch(navigateToCreateFavStops)}
        />
      )
    }
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
      headerRight: addButton(navigation),
      headerLeft: drawerButton(navigation)
    }
  }
});

const NonDrawerNavigation = StackNavigator ({
  LineList: { screen: LineList },
  StopList: { screen: StopList },
  DirList: { screen: DirList },
  ArrivalTimes: { screen: ArrivalTimes },
})

const AppNavigator = StackNavigator({
  DrawerNavigation: { screen: DrawerNavigation},
  NonDrawerNavigation: { screen: NonDrawerNavigation }
}, {
  headerMode: 'none',
  initialRouteName: 'DrawerNavigation'
});



export default AppNavigator;
