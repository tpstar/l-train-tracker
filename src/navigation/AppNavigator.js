import React from 'react';
import { StackNavigator, DrawerNavigator } from "react-navigation";

import FavStopList from '../components/FavStopList';
import LineList from '../components/LineList';
import StopList from '../components/StopList';
import DirList from '../components/DirList';
import ArrivalTimes from '../components/ArrivalTimes';
import TripDestinationStops from '../components/TripDestinationStops';
import TripEstimates from '../components/TripEstimates';
import DrawerContainer from '../components/DrawerContainer';


// const DrawerStack = DrawerNavigator({
//   FavStopList: { screen: FavStopList },
// }, {
//   contentComponent: DrawerContainer,
//   drawerOpenRoute: 'DrawerOpen', //fix react navigation bug
//   drawerCloseRoute: 'DrawerClose',
//   drawerToggleRoute: 'DrawerToggle'
// });
//
// const DrawerNavigation = StackNavigator({
//   //to build a header for the DrawerNavigation pages
//   DrawerStack: { screen: DrawerStack }
// }, {  //followings are the header for pages with menu button to open the drawer stack
//   headerMode: 'float',
//   navigationOptions: ({ navigation }) => {
//     const drawerButton = (navigation) => {
//       return (
//         <MaterialIcons
//           style={{padding: 5, color: '#3F51B5'}}
//           name="menu"
//           size={36}
//           onPress={() => { navigation.navigate('DrawerToggle')}}
//         />
//       )
//     }
//     return {
//       title: "Favorite Stops",
//       headerRight: NavigateTo(navigation, 'search', 'LineList'), //NavigationActions.navigate({ routeName }) with Material icon name
//                            // navigation, material icon name, route name
//       headerLeft: drawerButton(navigation)
//     }
//   }
// });

// const DrawerNavigation = DrawerNavigator({
//   FavStopList: { screen: FavStopList },
// }, {
//   headerMode: 'float',
//   contentComponent: DrawerContainer,
//   drawerOpenRoute: 'DrawerOpen', //fix react navigation bug
//   drawerCloseRoute: 'DrawerClose',
//   drawerToggleRoute: 'DrawerToggle'
// });

const StackNavigation = StackNavigator ({
  FavStopList: { screen: FavStopList },
  LineList: { screen: LineList },
  StopList: { screen: StopList },
  DirList: { screen: DirList },
  ArrivalTimes: { screen: ArrivalTimes },
  TripDestinationStops: { screen: TripDestinationStops },
  TripEstimates: { screen: TripEstimates }
});

const AppNavigator = DrawerNavigator({
  StackNavigation: { screen: StackNavigation }
}, {
  // initialRouteName: 'DrawerNavigation',
    contentComponent: DrawerContainer,
    drawerOpenRoute: 'DrawerOpen', //fix react navigation bug
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    // contentOptions: {
    //   activeTintColor: '#e91e63',
    //   style: {
    //     flex: 1,
    //     paddingTop: 15,
    //   }
    // }
});



export default AppNavigator;
