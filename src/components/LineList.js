import React, { Component } from 'react';
import { HeaderBackButton, NavigationActions } from 'react-navigation';
import { FlatList } from 'react-native';
import { Card, CardSection, Button, Header } from './common';
import { trainLines } from '../data'
import LineListItem from './LineListItem';
import { NavigateTo } from './helper';

class LineList extends Component {

  onButtonPress(trainline) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'StopList',
      params: { trainline }
    })
    this.props.navigation.dispatch(navigateAction);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "CTA Train Lines",
      // headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
      headerLeft: NavigateTo(navigation, 'navigate-before', 'DrawerNavigation')
                           // navigation, material icon name, route name
    }
  };
  render() {
    return (
      <Card>
        <Header headerText={"Choose Train Line"} />
        <FlatList
          data={trainLines}
          renderItem={({item}) => <LineListItem trainline={item} onButtonPress={this.onButtonPress.bind(this)}/>}
          keyExtractor={(item)=>item.name}
        />
      </Card>
    )
  }
}

export default LineList;
