import React, { Component } from 'react';
import { HeaderBackButton } from 'react-navigation';
// import { FlatList } from 'react-native';
import { Card, CardSection, Button, Header } from './common';
import { Stops } from '../data'
// import ListItem from './ListItem';

class StopList extends Component {

  // onButtonPress(line) {
  //   console.log(line)
  // }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Create Favorite Stop",
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    }
  };
  render() {
    // console.log(this.props.navigation.state.params) //{trainline: "red"} from FavStopCreate

    // const { trainline } = this.props.navigation.state.params;
    // console.log(trainline)

    return (
      <Card>
        <Header headerText={"Choose Stop"} />
        {/* <FlatList
          data={trainLines}
          renderItem={({item}) => <ListItem trainline={item} onButtonPress={this.onButtonPress}/>}
          keyExtractor={(item)=>item.name}
        /> */}
      </Card>
    )
  }
}

export default StopList;
