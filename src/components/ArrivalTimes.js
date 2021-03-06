import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Card, Header, Button, CardSection, Spinner, HeaderTrain } from './common';
import { fetchArrivalTime, createFavStop } from '../actions';
import ArrivalTimeItem from './ArrivalTimeItem';
import { NavigateTo } from './helper';


class ArrivalTimes extends Component {

  componentWillMount() {
    const { trainline, trainstop, boundFor } = this.props.navigation.state.params; //from params in navigation dispatch
    this.props.fetchArrivalTime({ trainline, trainstop, boundFor }); // put trainline, trainstop, boundFor as argument
  }

  static navigationOptions = ({ navigation }) => {
    const drawerButton = (navigation) => {
      return (
        <MaterialIcons
          style={{padding: 5, color: '#3F51B5'}}
          name="menu"
          size={36}
          onPress={() => { navigation.navigate('DrawerToggle')}}
        />
      )
    }
    const { trainline, trainstop, boundFor } = navigation.state.params;
    return {
      title: "Arrival Times",
      headerRight: NavigateTo(navigation, 'replay', 'ArrivalTimes', { trainline, trainstop, boundFor }), //NavigationActions.navigate({ routeName }) with Material icon name
                           // navigation, material icon name, route name, params
      headerLeft: drawerButton(navigation)
    }
  }

  onButtonPressSave(trainline, trainstop, boundFor) {
    this.props.createFavStop({ trainline, trainstop, boundFor });
    this.props.navigation.dispatch(
      {
        type: 'Navigation/NAVIGATE',
        routeName: 'FavStopList', //To FavStopList
      }
    )
  }

  onButtonPressCreateTrip( arrivaltime ) {
    // console.log(arrivaltime)
    const { trainline, trainstop, boundFor } = this.props.navigation.state.params;
    const departure = { trainline, trainstop, boundFor, arrivaltime };
    this.props.navigation.dispatch(
      {
        type: 'Navigation/NAVIGATE',
        routeName: 'TripDestinationStops',
        params: { departure }
      })
  }

  renderSaveButton(trainline, trainstop, boundFor) {
    const { favstops, arrivaldata } = this.props;
    const renderButton = () => {
      return (
      <Button
        onPress={()=>this.onButtonPressSave(trainline, trainstop, boundFor)}
        overwriteTextStyle={{color: '#E8EAF6'}}
        overwriteButtonStyle={{borderColor: '#9FA8DA', backgroundColor: `#9FA8DA`}}
      >
         Save this Stop
      </Button>
    )}
    if (arrivaldata.loading) {
      return <Spinner size="large" />
    }
    if (_.isEmpty(favstops)) {
      return renderButton();
    } else {
      const selectedStop = { trainline, trainstop, boundFor };
      // check if the stop is already in the list
      const favStopExists = favstops.some((favstop) => (
        favstop.trainline.name === selectedStop.trainline.name &&
        favstop.trainstop.name === selectedStop.trainstop.name &&
        favstop.boundFor.name === selectedStop.boundFor.name
      ))
      if (!favStopExists) { //if the selected stop does not exist in the fav stop list
        return renderButton()
      }
    }
  }

  renderNoArrivals(arrivaldata) {
    if (arrivaldata.error) {
      return (
        <Header
          headerText={arrivaldata.error}
          overwriteTextStyle={{color: '#E57373', fontWeight: 'bold'}}
        />
      )
    }
  }

  render() {
    const { trainline, trainstop, boundFor } = this.props.navigation.state.params;
    //from params in NavigationActions either from StopList or DirList
    const { arrivaldata } = this.props;
    // console.log("is state to props called twice in render?", arrivaldata)
    const timestampRaw = arrivaldata.tmst;
    let timestamp = '';
    if (timestampRaw) {
      timestamp = moment(timestampRaw).format('h:mm a');
    }
    const arrivaltimes = arrivaldata.eta;

    let bound = '';
    if (!boundFor.isTerminal) { // if arrival is not for terminal arrival
      bound = ' bound';
    } else {
      bound = ' (Terminal Arrival)';
    }

    return (
      <Card>
        <HeaderTrain
          headerText={`  Arrivals at ${trainstop.name}`}
          overwriteTextStyle={{color: '#212121', fontWeight: 'bold'}}
          trainColor={trainline.primarycolor}
        />

        <Header
          headerText={boundFor.name + bound}
          overwriteTextStyle={{fontSize: 18}}
        />
        <CardSection>
          {this.renderSaveButton(trainline, trainstop, boundFor)}
        </CardSection>
        <Header
          headerText={`Updated ${timestamp}`}
          overwriteTextStyle={{fontSize: 18}}
        />
        {this.renderNoArrivals(arrivaldata)}
        <FlatList
          data={arrivaltimes}
          renderItem={({ item }) => <ArrivalTimeItem
                        arrivaltime={item}
                        onButtonPress={this.onButtonPressCreateTrip.bind(this)}
                        trainline={trainline}
                        boundFor={boundFor}
                      />}
          keyExtractor={(item)=>item.rn}
        />
      </Card>
    )
  }
}

const mapStateToProps = state => {
  const { arrivaldata, favstops } = state; //arrivaldata from reducers/index.js and from action creator fetchArrivalTime in this same file
  return { arrivaldata, favstops };
}

export default connect(mapStateToProps, { fetchArrivalTime, createFavStop })(ArrivalTimes);
