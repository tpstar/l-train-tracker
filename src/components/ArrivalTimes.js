import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { HeaderBackButton } from 'react-navigation';
import { Card, Header, Button } from './common';
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
    const { arrivaltimes } = this.props;
    let timestamp = '';
    if (arrivaltimes.tmst) {
      timestamp = arrivaltimes.tmst.split('T')[1];
    }
    console.log(arrivaltimes);
    const { eta } = arrivaltimes;

    return (
      <Card>
        <Header headerText={`Arrivals at ${favstop.trainstop.name}`} />
        <Header headerText={`Updated ${timestamp}`} />
        <FlatList
          data={eta}
          renderItem={({item}) => <Button>{Math.round(parseFloat(Date.parse(item.arrT)-Date.parse(arrivaltimes.tmst))/60000)}</Button>}

        />
      </Card>
    )
  }
}

const mapStateToProps = state => {
  const { arrivaltimes } = state; //arrivaltimes from reducers/index.js
  return { arrivaltimes };
}

export default connect(mapStateToProps, { arrivalTimeFetch })(ArrivalTimes);
