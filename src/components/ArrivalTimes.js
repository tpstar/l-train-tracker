import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { NavigationActions } from 'react-navigation';
import { Card, Header, Button, CardSection } from './common';
import { arrivalTimeFetch, createFavStop } from '../actions';
import ArrivalTimeItem from './ArrivalTimeItem';
import { NavigateTo } from './helper';

class ArrivalTimes extends Component {

  onButtonPress(trainline, trainstop, destination) {
    // console.log(trainline, trainstop, destination)
    const navigateAction = NavigationActions.navigate({
      routeName: 'DrawerNavigation',
    })
    this.props.navigation.dispatch(navigateAction);
    this.props.createFavStop({ trainline, trainstop, destination });
  }

  componentWillMount() {
    const { trainline, trainstop, destination } = this.props.navigation.state.params; //from params in NavigationActions
    this.props.arrivalTimeFetch({ trainstop, destination }); // put trainline, trainstop, destination as argument
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Arrival Times",
      headerLeft: NavigateTo(navigation, 'navigate-before', 'DrawerNavigation')
                           // navigation, material icon name, route name
    }
  };

  render() {
    const { trainline, trainstop, destination, fav } = this.props.navigation.state.params;
    //from params in NavigationActions either from StopList or DirList
    const { arrivaldata } = this.props;
    const timestampRaw = arrivaldata.tmst;
    let timestamp = '';
    if (timestampRaw) {
      timestamp = moment(timestampRaw).format('h:mm a');
    }
    // if (fav) {
      console.log('favorite?:', fav)
    // }
    const arrivaltimes = arrivaldata.eta;

    return (
      <Card>
        <Header headerText={`Arrivals at ${trainstop.name}`} />
        <Header headerText={`${destination.name} bound`} />
        <CardSection>
          <Button
            // onPress={this.onButtonPress(trainline, trainstop, destination)}
            //above will run onButtonPress before the button is pressed
            onPress={()=>this.onButtonPress(trainline, trainstop, destination)}
            // overwriteTextStyle={{color: `${trainline.textcolor}`}}
            // overwriteButtonStyle={{borderColor: `${trainline.name}`, backgroundColor: `${trainline.name}`}}
          >
            Save this Stop
          </Button>
        </CardSection>
        <Header headerText={`Updated ${timestamp}`} />
        <FlatList
          data={arrivaltimes}
          renderItem={({ item }) => <ArrivalTimeItem
                        arrivaltime={item}
                        // onButtonPress={this.onButtonPress.bind(this)}
                        trainline={trainline}
                        destination={destination}
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

export default connect(mapStateToProps, { arrivalTimeFetch, createFavStop })(ArrivalTimes);
