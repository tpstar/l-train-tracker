import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import _ from 'lodash';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { List, ListItem } from 'react-native-elements';
import { trainLines } from '../data';

export default class DrawerContainer extends React.Component {

  onButtonPress(trainline) {
    console.log(this.props.navigation);

    this.props.navigation.dispatch(
      {
        type: 'Navigation/NAVIGATE',
        routeName: 'NonDrawerNavigation',
        action: {
          type: 'Navigation/NAVIGATE',
          routeName: 'StopList',
          params: trainline
        }
      })
  }

  render() {
    console.log({...styles.drawerItem, color: "white"})
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        {/* <Text
          onPress={() => navigation.navigate('FavStopList')}
          style={styles.drawerItem}>
          Favorite Stop List
        </Text> */}
        <List>
          <ListItem
            onPress={() => navigation.navigate('FavStopList')}
            title={'Favorite Stop List'}
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
