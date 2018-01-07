import React from 'react';
import { trainLines } from '../data';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class DrawerContainer extends React.Component {

  onButtonPress(trainline) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'StopListStack',
      params: { trainline }
    })
    this.props.navigation.dispatch(navigateAction);
  }

  render() {

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
              style={styles.drawerItem}>
              <MaterialIcons
                style={{width: 38, height: 40, borderRadius: 15, color: 'red'}}
                name={'train'}
                size={36}
              />
              {item.name} Line
            </Text>
          )}
        />
          {/* <LineListItem trainline={item} onButtonPress={this.onButtonPress.bind(this)}/>}
          keyExtractor={(item)=>item.name}


        <Text
          onPress={() => navigation.navigate('StopListFromDrawer', {trainline: trainLines[0]})}
          style={styles.drawerItem}>
          <MaterialIcons
            style={{width: 38, height: 40, borderRadius: 15, color: 'red'}}
            name={'train'}
            size={36}
          />
          Red Line
        </Text>
        <Text
          onPress={() => navigation.navigate('StopListFromDrawer', {trainline: trainLines[3]})}
          style={styles.drawerItem}>
          <MaterialIcons
            style={{width: 38, height: 40, borderRadius: 15, color: 'orange'}}
            name={'train'}
            size={36}
          />
          Orange Line
        </Text> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  drawerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E73536',
    // padding: 15,
    // margin: 5,
    // borderRadius: 2,
    // borderColor: '#E73536',
    // borderWidth: 1,
    // textAlign: 'center'
  }
})
