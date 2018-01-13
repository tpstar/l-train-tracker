import React from 'react';
import { StackNavigator, DrawerNavigator } from "react-navigation";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FavStopList from '../components/FavStopList';
import LineList from '../components/LineList';
import StopList from '../components/StopList';
import DirList from '../components/DirList';
import ArrivalTimes from '../components/ArrivalTimes';
import TripDestinationStops from '../components/TripDestinationStops';
import TripEstimates from '../components/TripEstimates';
import DrawerContainer from '../components/DrawerContainer';
import { NavigateTo } from '../components/helper';

const DrawerStack = DrawerNavigator({
  FavStopList: { screen: FavStopList },
}, {
  contentComponent: DrawerContainer,
  drawerOpenRoute: 'DrawerOpen', //fix react navigation bug
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
});

const DrawerNavigation = StackNavigator({
  //to build a header for the DrawerNavigation pages
  DrawerStack: { screen: DrawerStack }
}, {  //followings are the header for pages with menu button to open the drawer stack
  headerMode: 'float',
  navigationOptions: ({ navigation }) => {
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
});

const NonDrawerNavigation = StackNavigator ({
  LineList: { screen: LineList },
  StopList: { screen: StopList },
  DirList: { screen: DirList },
  ArrivalTimes: { screen: ArrivalTimes },
  TripDestinationStops: { screen: TripDestinationStops },
  TripEstimates: { screen: TripEstimates }
})

const AppNavigator = StackNavigator({
  DrawerNavigation: { screen: DrawerNavigation},
  NonDrawerNavigation: { screen: NonDrawerNavigation }
}, {
  headerMode: 'none',
  initialRouteName: 'DrawerNavigation'
});



export default AppNavigator;
