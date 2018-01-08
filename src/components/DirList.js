import React, { Component } from 'react';
import { HeaderBackButton, NavigationActions } from 'react-navigation';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { createFavStop } from '../actions';
import { Card, CardSection, Button, Header } from './common';
import DirListItem from './DirListItem';

class DirList extends Component {

  onButtonPress(destination) {
    // const navigateAction = NavigationActions.navigate({
    //   routeName: 'DrawerNavigation',
    // })
    const { trainline, trainstop } = this.props.navigation.state.params;
    const navigateAction = NavigationActions.navigate({
      routeName: 'ArrivalTimes',
      params: { trainline, trainstop, destination }
    })
    this.props.navigation.dispatch(navigateAction);

    // this.props.createFavStop({ trainline, trainstop, destination });
    // // console.log(trainline, trainstop, destination);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Directions",
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    }
  };
  render() {
    const { trainline, trainstop } = this.props.navigation.state.params; //{trainline: "red"} from params in NavigationActions
    // console.log(trainline, trainstop)

    return (
      <Card>
        <Header headerText={"Choose Direction"} />
        <FlatList
          data={Object.values(trainline.destination)}
          renderItem={({item}) => <DirListItem
                        destination={item}
                        onButtonPress={this.onButtonPress.bind(this)}
                        trainline={trainline}
                        trainstop={trainstop}
                      />}
          keyExtractor={(item, index)=>index}
        />
      </Card>
    )
  }
}

export default connect(null, { createFavStop })(DirList);
