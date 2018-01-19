import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, Text, Button, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CardSection } from './common';
import FavStopListItem from './FavStopListItem';
import { NavigateTo } from './helper';


class FavStopList extends Component {

  onButtonPress(favstop) {
    // console.log(favstop)
    const { trainline, trainstop, boundFor } = favstop;

    this.props.navigation.dispatch(
      {
        type: 'Navigation/NAVIGATE',
        routeName: 'ArrivalTimes', //To FavStopList
        params: { trainline, trainstop, boundFor }
      }
    )
  }


  static navigationOptions = ({ navigation }) => {
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
      headerRight: NavigateTo(navigation, 'search', 'LineList'), //NavigationActions.navigate({ routeName }) with Material icon name
                           // navigation, material icon name, route name
      headerLeft: drawerButton(navigation)
    }
  }

  render() {
    return (
      <View>
      <Text style={styles.titleStyle}>
        Hello
      </Text>
      <FlatList
        data={this.props.favstops}
        renderItem={({ item })=><FavStopListItem
          favstop={item}
          onButtonPress={this.onButtonPress.bind(this)}
        />}
        keyExtractor={(item, index)=>index}
      />
      </View>
    )
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
}

const mapStateToProps = state => {
  const { favstops } = state; //favtrainsstops from reducers/index.js
  return { favstops };
}

export default connect(mapStateToProps, {})(FavStopList);
