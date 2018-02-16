import React from 'react';
import moment from 'moment';
import { HeaderBackButton, NavigationActions } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { rushHour } from '../../data';

export const NavigateTo = (navigation, iconName, routeName) => {
  const navToRoute = NavigationActions.navigate({ routeName });
  return (
    <MaterialIcons
      style={{padding: 5, color: '#3F51B5'}}
      name={iconName}
      size={36}
      onPress={() => navigation.dispatch(navToRoute)}
    />
  )
}

export const waitingMin = (arrivaltime) => {
  return(
    Math.round(
    parseFloat(
      moment(arrivaltime.arrT).diff(moment(arrivaltime.prdt))
    )/60/1000 //milliseconds to minutes
  ))
};

export const isPurpleExpress = (arrivaltime) => {
  console.log(arrivaltime)
  if (arrivaltime.destSt === "30203") {
    //30203 is stpId for 'Linden', meaning heading to Loop and coming back to Linden
    console.log("express!!!", arrivaltime);
    return true;
  // } else if (arrivaltime.destNm === 'Howard') {
  //   console.log("not an express", arrivaltime);
  //   return false;
  } else {
    console.log("not sure", arrivaltime);

    const isRushHour = (departureStop_stpId, departureStop_arrT) => {
      //check if it's rushperiod;
      const dayOneToSeven = moment(departureStop_arrT).day(); //Sunday => 0 ... Saturday => 6
      console.log(dayOneToSeven)
      if (dayOneToSeven === 0 || dayOneToSeven === 6) {
        return false; //during weekends, no rushperiod and no purple line express
      }

      const departureStopArrTime = moment(departureStop_arrT);
      const rushHourArrTimes = rushHour[departureStop_stpId].map((time) => moment(time, 'HH:mm A'));

      if ((departureStopArrTime > rushHourArrTimes[0] && departureStopArrTime < rushHourArrTimes[1]) || (departureStopArrTime > rushHourArrTimes[2] && departureStopArrTime < rushHourArrTimes[3])) {
        return true;
      } else {
        return false;
      }
    };
    // return isRushHour(arrivaltime.stpId, arrivaltime.arrT);
    return isRushHour(arrivaltime.stpId, "2018-02-16T09:10:21");
  }
};
