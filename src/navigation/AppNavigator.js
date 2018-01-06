import React from 'react';
import { StackNavigator, DrawerNavigator } from "react-navigation";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FavStopList from '../components/FavStopList';
import LineList from '../components/LineList';
import StopListStack from '../components/StopListStack';
import DirList from '../components/DirList';
import ArrivalTimes from '../components/ArrivalTimes';
import RedList  from '../components/RedList';
import { NavigateTo } from '../components/helper';

const DrawerStack = DrawerNavigator({
  FavStopList: { screen: FavStopList },
  RedList: { screen: RedList }
// }, {

})

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
      headerRight: NavigateTo(navigation, 'add-circle', 'LineList'),
                           // navigation, material icon name, route name
      headerLeft: drawerButton(navigation)
    }
  }
});

const NonDrawerNavigation = StackNavigator ({
  LineList: { screen: LineList },
  StopListStack: { screen: StopListStack },
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
