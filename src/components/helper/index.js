import React from 'react';
import moment from 'moment';
import { HeaderBackButton, NavigationActions } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const NavigateTo = (navigation, iconName, routeName) => {
  const navToRoute = NavigationActions.navigate({ routeName });
  return (
    <MaterialIcons
      style={{padding: 5, color: '#3F51B5'}}
      name={iconName}
      size={36}
      onPress={() => navigation.dispatch(navToRoute)}
    />
  )
}

export const waitingMin = (arrivaltime) => {
  return(
    Math.round(
    parseFloat(
      moment(arrivaltime.arrT).diff(moment(arrivaltime.prdt))
    )/60/1000 //milliseconds to minutes
  ))
}
