import React from 'react';
import _ from 'lodash';
import { List, ListItem, Avatar } from 'react-native-elements';
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
    const { containerStyle } = styles;
    return (
        <List containerStyle={{...containerStyle}}>
          <ListItem
            chevronColor={'#263238'}
            avatar={<Avatar
              medium
              rounded={true}
              source={require('../data/train.png')}
            />}
            title={'L Train Tracker'}
            titleStyle={{color:'white'}}
            containerStyle={{ borderBottomColor: '#424242' }}
          />
          <ListItem
            onPress={() => navigation.navigate('FavStopList')}
            title={'Stop List'}
            titleStyle={{color:'white'}}
            leftIcon={{name: 'favorite', color: '#F06292'}}
            containerStyle={{ borderBottomColor: '#424242' }}
          />
          <ListItem
            onPress={() => navigation.navigate('FavTripList')}
            title={'Trip List'}
            titleStyle={{color:'white'}}
            leftIcon={{name: 'favorite', color: '#F06292'}}
            containerStyle={{ borderBottomColor: '#424242' }}
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
                containerStyle={{ borderBottomColor: '#424242' }}
              />
            ))
          }
        </List>
    )
  }
}

const styles = {
  containerStyle: {
    marginTop: 0,
    paddingTop: 2,
    paddingBottom: 0,
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
    backgroundColor: '#263238'
  }
};
