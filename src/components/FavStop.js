import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { Card, Header } from './common';


class FavStop extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Arrival Times",
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    }
  };
  render() {
    const { favstop } = this.props.navigation.state.params; //{trainline: "red"} from params in NavigationActions
    // const trainStops = trainline.stops;

    return (
      <Card>
        <Header headerText={`Arrivals at ${favstop.trainstop.name}`} />
        {/* <FlatList
          data={trainStops}
          renderItem={({item, index}) => <StopListItem
                        trainstopName={item}
                        trainstopIndex={index}
                        onButtonPress={this.onButtonPress.bind(this)}
                        trainline={trainline}
                      />}
          keyExtractor={(item, index)=>index}
        /> */}
      </Card>
    )
  }
}

export default FavStop;
