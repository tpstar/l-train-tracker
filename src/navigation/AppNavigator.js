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
