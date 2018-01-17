import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { HeaderBackButton } from 'react-navigation';
import _ from 'lodash';
import { Card, Header, Button, CardSection } from './common';
import { arrivalTimeFetch, createFavStop } from '../actions';
import TripEstimateItem from './TripEstimateItem';
import { NavigateTo } from './helper';
import { waitingMin } from './helper';

class TripEstimates extends Component {

  // remove arrivaldata from state to props and get data from arrivaltime from TripDesinationStops
  // remove TripEstimateItem, show only one run data on TripEstimate

  // onButtonPressSave(trainline, trainstop, boundFor) {
  //   const { favstops } = this.props;
  //   // console.log(_.isEmpty(favstops));
  //   const selectedStop = { trainline, trainstop, boundFor }
  //   if (_.isEmpty(favstops)) {
  //     this.props.createFavStop({ trainline, trainstop, boundFor });
  //   } else {
  //     const favStopExists = favstops.some((favstop) => (
  //       favstop.trainline.name === selectedStop.trainline.name &&
  //       favstop.trainstop.name === selectedStop.trainstop.name &&
  //       favstop.boundFor.name === selectedStop.boundFor.name
  //     ))
  //     if (favStopExists) { //prevent saving duplicate favstops
  //       console.log('Alert! This stop is already a fav stop!')
  //     } else {
  //       this.props.createFavStop({ trainline, trainstop, boundFor });
  //     }
  //   }
  //   this.props.navigation.dispatch(
  //     {
  //       type: 'Navigation/NAVIGATE',
  //       routeName: 'DrawerNavigation', //To FavStopList
  //     })
  // }

  // onButtonPressCreateTrip(trainline, trainstop, boundFor) {
  //   const departure = { trainline, trainstop, boundFor };
  //   console.log('departure: ', departure);
  //   this.props.navigation.dispatch(
  //     {
  //       type: 'Navigation/NAVIGATE',
  //       routeName: 'TripDestinationStops',
  //       params: { departure }
  //     })
  // }

  // componentWillMount() {
  //   const { trainline, departureStop, boundFor } = this.props.navigation.state.params; //from params in navigation.dispatch
  //   this.props.arrivalTimeFetch({ trainline, trainstop: departureStop, boundFor }); // put trainline, trainstop, boundFor as argument
  // }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Trip Estimates",
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    }
  };

  render() {
    const { trainline, departureStop, boundFor, arrivalStop } = this.props.navigation.state.params;
    //from params in NavigationActions from TripDestinationStops
    // console.log( trainline, departureStop, boundFor, arrivalStop )
    const { followtraindata } = this.props;
    console.log( "is state to props called twice in render?", followtraindata ) // once with empty object and once with object with data
    let departureStopData = {};
    let arrivalStopData = {};
    if (followtraindata.eta) {
      console.log(followtraindata.eta, departureStop.staId, arrivalStop.staId);
      departureStopData = followtraindata.eta.find((stop) => stop.staId == departureStop.staId); // one is number and the other is string
      arrivalStopData = followtraindata.eta.find((stop) => stop.staId == arrivalStop.staId);
      console.log(waitingMin(departureStopData), waitingMin(arrivalStopData), moment(departureStopData.arrT).format('h:mm a'), moment(arrivalStopData.arrT).format('h:mm a'))
    }

    return (
      <Card>
        <Header headerText={`Departure: ${departureStop.name}`} />
        <Header headerText={`in ${waitingMin(departureStopData)} min at ${moment(departureStopData.arrT).format('h:mm a')}`} />
        <Header headerText={`Arrival: ${arrivalStop.name}`} />
        <Header headerText={`arriving at ${moment(arrivalStopData.arrT).format('h:mm a')}`} />
        {/* <CardSection>
          <Button
            // onPress={this.onButtonPress(trainline, trainstop, boundFor)}
            //above will run onButtonPress before the button is pressed
            onPress={()=>this.onButtonPressSave(trainline, trainstop, boundFor)}
            // overwriteTextStyle={{color: `${trainline.textcolor}`}}
            // overwriteButtonStyle={{borderColor: `${trainline.name}`, backgroundColor: `${trainline.name}`}}
          >
            Save this Stop
          </Button>
          <Button
            onPress={()=>this.onButtonPressCreateTrip(trainline, trainstop, boundFor)}
            // overwriteTextStyle={{color: `${trainline.textcolor}`}}
            // overwriteButtonStyle={{borderColor: `${trainline.name}`, backgroundColor: `${trainline.name}`}}
          >
            Create a trip
          </Button>
        </CardSection> */}
        {/* <Header headerText={`Updated ${timestamp}`} /> */}
        {/* <FlatList
          data={arrivaltimes}
          renderItem={({ item }) => <TripEstimateItem
                        arrivaltime={item}
                        // onButtonPress={this.onButtonPress.bind(this)}
                        trainline={trainline}
                        arrivalStop={arrivalStop}
                      />}
          keyExtractor={(item)=>item.rn}
        /> */}
      </Card>
    )
  }
}

const mapStateToProps = state => {
  const { followtraindata } = state; //arrivaldata from reducers/index.js
  return { followtraindata };
}

export default connect(mapStateToProps, { arrivalTimeFetch, createFavStop })(TripEstimates);
