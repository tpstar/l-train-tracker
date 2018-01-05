import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { HeaderBackButton, NavigationActions } from 'react-navigation';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Card, Header, Button } from './common';
import { arrivalTimeFetch } from '../actions';
import ArrivalTimeItem from './ArrivalTimeItem';

class ArrivalTimes extends Component {

  componentWillMount() {
    const { favstop } = this.props.navigation.state.params; //from params in NavigationActions
    // console.log(favstop);
    this.props.arrivalTimeFetch({ favstop }); // put favstop as argument
  }

  static navigationOptions = ({ navigation }) => {
    const navigateToFavStops = NavigationActions.navigate({
      routeName: 'DrawerNavigation'
    });
    const navBackButton = (navigation) => {
      return (
        <MaterialIcons
          style={{padding: 5, color: '#3F51B5'}}
          name="navigate-before"
          size={36}
          onPress={() => navigation.dispatch(navigateToFavStops)}
        />
      )
    }
    return {
      title: "Arrival Times",
      headerLeft: navBackButton(navigation)
    }
  };
  render() {
    const { favstop } = this.props.navigation.state.params;
    //from params in NavigationActions either from StopList or DirList
    const { arrivaldata } = this.props;
    const timestampRaw = arrivaldata.tmst;
    let timestamp = '';
    if (timestampRaw) {
      timestamp = moment(timestampRaw).format('h:mm a');
    }
    // console.log(arrivaldata);
    const arrivaltimes = arrivaldata.eta;

    return (
      <Card>
        <Header headerText={`Arrivals at ${favstop.trainstop.name}`} />
        <Header headerText={`Updated ${timestamp}`} />
        <FlatList
          data={arrivaltimes}
          renderItem={({ item }) => <ArrivalTimeItem
                        arrivaltime={item}
                        // onButtonPress={this.onButtonPress.bind(this)}
                        favstop={favstop}
                      />}
          keyExtractor={(item)=>item.rn}
        />
      </Card>
    )
  }
}

const mapStateToProps = state => {
  const { arrivaldata } = state; //arrivaldata from reducers/index.js
  return { arrivaldata };
}

export default connect(mapStateToProps, { arrivalTimeFetch })(ArrivalTimes);
