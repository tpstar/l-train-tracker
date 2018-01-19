import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { HeaderBackButton } from 'react-navigation';
import _ from 'lodash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Card, Header, Button, CardSection } from './common';

import { NavigateTo } from './helper';

class TripEstimates extends Component {

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
    return {
      title: "Trip Estimates",
      headerRight: NavigateTo(navigation, 'search', 'LineList'), //NavigationActions.navigate({ routeName }) with Material icon name
                           // navigation, material icon name, route name
      headerLeft: drawerButton(navigation)
    }
  }

  render() {
    const { tripdata } = this.props;
    const { departureStop, arrivalStop } = this.props.navigation.state.params;
    console.log( "is state to props called twice in render?", tripdata ) // once with empty object and once with object with data
    let departureData = {};
    let arrivalData = {};
    if (tripdata.tripDepartureTime && tripdata.tripArrivalTime) { //when state to props is called with empty data tripdata.tripDepartureTime is false
      departureData = tripdata.tripDepartureTime;
      arrivalData = tripdata.tripArrivalTime;
    }

    return (
      <Card>
        <Header headerText={`Departure: ${departureStop.name}`} />
        <Header headerText={`at ${moment(departureData.arrT).format('h:mm a')}`} />
        <Header headerText={`Arrival: ${arrivalStop.name}`} />
        <Header headerText={`at ${moment(arrivalData.arrT).format('h:mm a')}`} />
        <CardSection>
          <Button
            // onPress={this.onButtonPress(trainline, trainstop, boundFor)}
            //above will run onButtonPress before the button is pressed
            // onPress={()=>this.onButtonPressSave(trainline, trainstop, boundFor)}
            // overwriteTextStyle={{color: `${trainline.textcolor}`}}
            // overwriteButtonStyle={{borderColor: `${trainline.name}`, backgroundColor: `${trainline.name}`}}
          >
            Save this Trip
          </Button>
        </CardSection>

      </Card>
    )
  }
}

const mapStateToProps = state => {
  const { tripdata } = state; //arrivaldata from reducers/index.js
  return { tripdata };
}

export default connect(mapStateToProps, { })(TripEstimates);
