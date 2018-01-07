import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { trainLines } from '../data';

export default class DrawerContainer extends React.Component {

  onButtonPress(trainline) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'StopListStack',
      params: { trainline }
    })
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    console.log({...styles.drawerItem, color: "white"})
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text
          onPress={() => navigation.navigate('FavStopList')}
          style={styles.drawerItem}>
          Favorite Stop List
        </Text>

        <FlatList
          data={trainLines}
          renderItem={({item, index}) => (
            <Text
              onPress={() => navigation.navigate('StopListFromDrawer', {trainline: trainLines[index]})}
              style={{...styles.drawerItem, color: item.name}}
            >
              <MaterialIcons
                style={{width: 38, height: 40, borderRadius: 15, color: item.name}}
                name={'train'}
                size={36}
              />
              {_.capitalize(item.name)} Line
            </Text>
          )}
          keyExtractor={(item, index)=>index}
        />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  drawerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: '#E73536',
    // padding: 15,
    // margin: 5,
    // borderRadius: 2,
    // borderColor: '#E73536',
    // borderWidth: 1,
    // textAlign: 'center'
  }
}
