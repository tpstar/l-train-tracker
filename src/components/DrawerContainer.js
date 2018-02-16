import React from 'react';
import _ from 'lodash';
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
        <List containerStyle={{marginTop: 1, backgroundColor: '#263238', flex: 1}}>
          <ListItem
            onPress={() => navigation.navigate('FavStopList')}
            title={'Stop List'}
            titleStyle={{color:'white'}}
            leftIcon={{name: 'favorite', color: '#F06292'}}
          />
          <ListItem
            onPress={() => navigation.navigate('FavTripList')}
            title={'Trip List'}
            titleStyle={{color:'white'}}
            leftIcon={{name: 'favorite', color: '#F06292'}}
          />
          {
            trainLines.map((item, index) => (
              <ListItem
                onPress={() => this.onButtonPress({trainline: trainLines[index]})}
                //navigation.navigate('StopListFromDrawer', {trainline: trainLines[index]})}
                key={index}
                title={`${_.capitalize(item.name)} Line`}
                titleStyle={{color:'white', fontSize: 16}}
                leftIcon={{name: 'train', color: item.primarycolor }} //name from MaterialIcons
              />
            ))
          }
        </List>
    )
  }
}
