import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { HeaderBackButton } from 'react-navigation';
import { Card, Header } from './common';
import { arrivalTimeFetch } from '../actions';

class FavStop extends Component {



  componentWillMount() {
    const { favstop } = this.props.navigation.state.params; //from params in NavigationActions
    console.log(favstop);
    this.props.arrivalTimeFetch({ favstop }); // put favstop as argument
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Arrival Times",
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    }
  };
  render() {
    const { favstop } = this.props.navigation.state.params; //from params in NavigationActions

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

export default connect(null, { arrivalTimeFetch })(FavStop);
