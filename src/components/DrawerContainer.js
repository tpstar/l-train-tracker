import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import _ from 'lodash';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { List, ListItem } from 'react-native-elements';
import { trainLines } from '../data';

export default class DrawerContainer extends React.Component {

  onButtonPress(trainline) {
    this.props.navigation.dispatch(
      {
        type: 'Navigation/NAVIGATE',
        routeName: 'StopList',
        params: trainline
      })
  }

  render() {
    const { navigation } = this.props
    return (

        <List>
          <ListItem
            onPress={() => navigation.navigate('FavStopList')}
            title={'Stop List'}
            leftIcon={{name: 'favorite' }}
          />
          {
            trainLines.map((item, index) => (
              <ListItem
                onPress={() => this.onButtonPress({trainline: trainLines[index]})}
                //navigation.navigate('StopListFromDrawer', {trainline: trainLines[index]})}
                key={index}
                title={`${_.capitalize(item.name)} Line`}
                leftIcon={{name: 'train', color: item.name }} //name from MaterialIcons
              />
            ))
          }
        </List>

    )
  }
}
