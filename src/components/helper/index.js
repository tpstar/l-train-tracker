import React from 'react';
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
