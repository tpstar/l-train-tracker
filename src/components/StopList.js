import React, { Component } from 'react';
import { HeaderBackButton } from 'react-navigation';
import { FlatList } from 'react-native';
import { Card, CardSection, Button, Header } from './common';
// import { trainLines } from '../data'
import StopListItem from './StopListItem';

class StopList extends Component {

  onButtonPress(trainstop) {
    // const navigateAction = NavigationActions.navigate({
    //   routeName: 'StopList',
    //   params: { trainline }
    // })
    // this.props.navigation.dispatch(navigateAction);
    console.log(trainstop);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Create Favorite Stop",
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    }
  };
  render() {
    const { trainline } = this.props.navigation.state.params; //{trainline: "red"} from params in NavigationActions
    const trainStops = trainline.stops;
    // console.log(trainline);

    return (
      <Card>
        <Header headerText={"Choose Stop"} />
        <FlatList
          data={trainStops}
          renderItem={({item}) => <StopListItem
                        trainstop={item}
                        onButtonPress={this.onButtonPress}
                        trainlineName={trainline.name}
                        trainlineText={trainline.textcolor}
                      />}
          keyExtractor={(item)=>item}
        />
      </Card>
    )
  }
}

export default StopList;
