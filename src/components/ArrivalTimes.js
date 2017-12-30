import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { HeaderBackButton } from 'react-navigation';
import { Card, Header } from './common';
import { arrivalTimeFetch } from '../actions';

class ArrivalTimes extends Component {

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
    const { favstop } = this.props.navigation.state.params;
    //from params in NavigationActions either from StopList or DirList

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

const mapStateToProps = state => {
  const { arrivaltimes } = state; //arrivaltimes from reducers/index.js
  console.log(arrivaltimes);
  return { arrivaltimes };
}

export default connect(mapStateToProps, { arrivalTimeFetch })(ArrivalTimes);
