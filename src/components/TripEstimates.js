import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { HeaderBackButton } from 'react-navigation';
import _ from 'lodash';
import { Card, Header, Button, CardSection } from './common';
import { arrivalTimeFetch, createFavStop } from '../actions';
import ArrivalTimeItem from './ArrivalTimeItem';
import { NavigateTo } from './helper';

class TripEstimates extends Component {

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

  componentWillMount() {
    const { trainline, departureStop, boundFor } = this.props.navigation.state.params; //from params in navigation.dispatch
    this.props.arrivalTimeFetch({ trainline, trainstop: departureStop, boundFor }); // put trainline, trainstop, boundFor as argument
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Trip Estimates",
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    }
  };

  render() {
    const { trainline, departureStop, boundFor, arrivalStop } = this.props.navigation.state.params;
    //from params in NavigationActions from TripDestinationStops
    console.log( trainline, departureStop, boundFor, arrivalStop )
    const { arrivaldata } = this.props;
    console.log(arrivaldata)
    // const timestampRaw = arrivaldata.tmst;
    // let timestamp = '';
    // if (timestampRaw) {
    //   timestamp = moment(timestampRaw).format('h:mm a');
    // }
    // const arrivaltimes = arrivaldata.eta;

    return (
      <Card>
        <Header headerText={`Departure: ${departureStop.name}`} />
        <Header headerText={`Arrival: ${arrivalStop.name}`} />
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
        </CardSection>
        <Header headerText={`Updated ${timestamp}`} />
        <FlatList
          data={arrivaltimes}
          renderItem={({ item }) => <ArrivalTimeItem
                        arrivaltime={item}
                        // onButtonPress={this.onButtonPress.bind(this)}
                        trainline={trainline}
                        boundFor={boundFor}
                      />}
          keyExtractor={(item)=>item.rn}
        /> */}
      </Card>
    )
  }
}

const mapStateToProps = state => {
  const { arrivaldata, favstops } = state; //arrivaldata from reducers/index.js
  return { arrivaldata, favstops };
}

export default connect(mapStateToProps, { arrivalTimeFetch, createFavStop })(TripEstimates);
