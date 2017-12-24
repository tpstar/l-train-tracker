import React, { Component } from 'react';
import { HeaderBackButton } from 'react-navigation';
import { FlatList } from 'react-native';
import { Card, CardSection, Button, Header } from './common';
import { trainLines } from '../data'
import ListItem from './ListItem';

class FavStopCreate extends Component {

  onButtonPress(line) {
    console.log(line)
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Create Favorite Stop",
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    }
  };
  render() {

    return (
      <Card>
        <Header headerText={"Choose Train Line"} />
        <FlatList
          data={trainLines}
          renderItem={({item}) => <ListItem trainline={item} onButtonPress={this.onButtonPress}/>}
          keyExtractor={(item)=>item.name}
        />
      </Card>
    )
  }
}

export default FavStopCreate;
