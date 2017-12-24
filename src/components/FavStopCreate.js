import React, { Component } from 'react';
import { HeaderBackButton, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { Card, CardSection, Button, Header } from './common';
import { trainLines } from '../data'
import ListItem from './ListItem';
import { createFavStop } from '../actions';

class FavStopCreate extends Component {

  onButtonPress(trainline) {
    const {createFavStop, navigation } = this.props;

    createFavStop({ trainline });

    const navigateAction = NavigationActions.navigate({
      routeName: 'StopList'
    })

    navigation.dispatch(navigateAction);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Create Favorite Stop",
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    }
  };
  render() {
    // const onButtonPress = (trainline) => {
    //   const { navigation } = this.props;
    //   navigation.navigate('StopList') //dispatch action to save trainline as state?
    //   createFavStop({ trainline });
    // }

    return (
      <Card>
        <Header headerText={"Choose Train Line"} />
        <FlatList
          data={trainLines}
          renderItem={({item}) => <ListItem trainline={item} onButtonPress={this.onButtonPress.bind(this)}/>}
          keyExtractor={(item)=>item.name}
        />
      </Card>
    )
  }
}

export default connect(null, { createFavStop })(FavStopCreate);
