import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Card, Header, Button, CardSection } from './common';
import { arrivalTimeFetch, createFavStop } from '../actions';
import ArrivalTimeItem from './ArrivalTimeItem';
import { NavigateTo } from './helper';


class ArrivalTimes extends Component {

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

  componentWillMount() {
    const { trainline, trainstop, boundFor } = this.props.navigation.state.params; //from params in navigation dispatch
    this.props.arrivalTimeFetch({ trainline, trainstop, boundFor }); // put trainline, trainstop, boundFor as argument
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
    return {
      title: "Arrival Times",
      headerRight: NavigateTo(navigation, 'search', 'LineList'), //NavigationActions.navigate({ routeName }) with Material icon name
                           // navigation, material icon name, route name
      headerLeft: drawerButton(navigation)
    }
  }

  renderSaveButton(trainline, trainstop, boundFor) {
    console.log(_.isEmpty(favstops))
    const { favstops } = this.props;
    const renderButton = () => {
      return (
      <Button
        onPress={()=>this.onButtonPressSave(trainline, trainstop, boundFor)}
        // overwriteTextStyle={{color: `${trainline.textcolor}`}}
        // overwriteButtonStyle={{borderColor: `${trainline.name}`, backgroundColor: `${trainline.name}`}}
      >
        Save this Stop
      </Button>
    )}
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

    return (
      <Card>
        <Header headerText={`Arrivals at ${trainstop.name}`} />
        <Header headerText={`${boundFor.name} bound`} />
        <CardSection>
          {this.renderSaveButton(trainline, trainstop, boundFor)}
        </CardSection>
        <Header headerText={`Updated ${timestamp}`} />
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
  const { arrivaldata, favstops } = state; //arrivaldata from reducers/index.js and from action creator arrivalTimeFetch in this same file
  return { arrivaldata, favstops };
}

export default connect(mapStateToProps, { arrivalTimeFetch, createFavStop })(ArrivalTimes);
