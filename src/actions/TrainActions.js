import moment from 'moment';
import {
  CREATE_FAV_STOP,
  CREATE_FAV_TRIP,
  FETCH_ARRIVAL_TIME,
  FETCH_ARRIVAL_TIME_SUCCESS,
  NOTIFY_NO_ARRIVALS,
  FOLLOW_TRAIN,
  FOLLOW_TRAIN_SUCCESS,
  FOLLOW_TRAIN_FAIL,
  DELETE_FAV_STOP,
  DELETE_FAV_TRIP,
  FETCH_TRIP_FAIL
} from './types';
import { CTA_API_KEY, Google_Maps_API_KEY } from '../config';
import { timeTables } from '../data/timetable';
import { isPurpleExpress } from '../components/helper';
import { trainLines } from '../data';


const estimateTravelTimeUsingScheduleTable = (stopA, stopB, route) => {
  // console.log(stopA, stopB, route);
  console.log("is Purple Express?", route.isPurpleExp);
  if (route.isPurpleExp) { // if route is purple express, then use a separate time schedule table for the express
    route.name = 'purpleExpress';
  }
  console.log(route.name);
  let dayOfWeek;
  const dayOneToSeven = moment(stopA.arrT).day(); //Sunday => 0 ... Saturday => 6
  if (dayOneToSeven >= 1 && dayOneToSeven < 6) {
    dayOfWeek = "weekdays";
  } else if (dayOneToSeven === 6) {
    dayOfWeek = "saturday";
  } else if (dayOneToSeven === 0) {
    dayOfWeek = "sunday";
    // dayOfWeek = "weekdays"; //to test rush hour
  }
  // console.log("day one to seven: ", dayOneToSeven, "day of week: ", dayOfWeek);

  const timeTable = timeTables[route.name][dayOfWeek]; //[stopA.boundFor.direction]; //don't need a direction since using stpId contains directional info
  console.log(timeTable, stopA.stpId);
  const indexOfClosestFutureService = timeTable[stopA.stpId].findIndex((element)=>(moment(element, 'HH:mm A').diff(moment(stopA.arrT)) > 0));

  ///// if there is no scheduled time that is later than the arriving time it will give -1; error occurs only close to midnight (before midnight)
  ///// if indexOfClosestFutureService is -1 assign it to the last index (length -1 )

  // find a train service column, closest future service in the table
  console.log(indexOfClosestFutureService, timeTable[stopA.stpId][indexOfClosestFutureService], timeTable[stopA.stpId][indexOfClosestFutureService - 1])
  const diffFutureAndNow = moment(timeTable[stopA.stpId][indexOfClosestFutureService], 'HH:mm A').diff(stopA.arrT);
  const diffPastAndNow = -moment(timeTable[stopA.stpId][indexOfClosestFutureService - 1], 'HH:mm A').diff(stopA.arrT);
  console.log(diffFutureAndNow, diffPastAndNow)
  let indexOfClosestService=indexOfClosestFutureService;

  if (diffFutureAndNow > diffPastAndNow && indexOfClosestFutureService != 0) {
    indexOfClosestService = indexOfClosestService - 1;
  }

  const stopB_stpId = stopB.stpId[stopA.boundFor.direction] || stopB.stpId[stopA.boundFor.direction2];

  let scheduledDepartureTime = timeTable[stopA.stpId][indexOfClosestService];
  let scheduledArrivalTime = timeTable[stopB_stpId][indexOfClosestService];
  console.log(indexOfClosestService, scheduledDepartureTime, scheduledArrivalTime);
  if (scheduledArrivalTime === "-" || scheduledDepartureTime === "-") {
    //this is to handle green line schedule table for two branch terminals
    if (timeTable[stopA_stpId][indexOfClosestService + 1]) { // if indexOfClosestService was the last index
      console.log('I am in if clause!')
      scheduledDepartureTime = timeTable[stopA.stpId][indexOfClosestService + 1];
      scheduledArrivalTime = timeTable[stopB_stpId][indexOfClosestService + 1];
    } else {
      scheduledDepartureTime = timeTable[stopA.stpId][indexOfClosestService - 1];
      scheduledArrivalTime = timeTable[stopB_stpId][indexOfClosestService - 1];
    }
  }
  console.log(indexOfClosestService, scheduledDepartureTime, scheduledArrivalTime);
  const tripDurationInMilliSec = moment(scheduledArrivalTime, 'HH:mm A').diff(moment(scheduledDepartureTime, 'HH:mm A'))

  let tripDurationInMin = tripDurationInMilliSec/60000;

  if (tripDurationInMin < -1300) { //if destination arrival time is next day
    tripDurationInMin += 1440
  }

  return tripDurationInMin;
}

export const createFavStop = ({ trainline, trainstop, boundFor }) => {
  // console.log(trainline, trainstop, boundFor);
  return  {
    type: CREATE_FAV_STOP,
    payload: { trainline, trainstop, boundFor }
  }
};

export const deleteFavStop = (favstop) => {
  return {
    type: DELETE_FAV_STOP,
    payload: favstop
  }
};

export const createFavTrip = ({ departureStop, arrivalStop, route }) => {
  console.log(departureStop, arrivalStop, route);
  return  {
    type: CREATE_FAV_TRIP,
    payload: { departureStop, arrivalStop, route }
  }
};

export const deleteFavTrip = (favtrip) => {
  return {
    type: DELETE_FAV_TRIP,
    payload: favtrip
  }
};

export const fetchArrivalTime = ({ trainline, trainstop, boundFor }) => {
  // console.log('stop platform id: ', trainstop.stpId[boundFor.direction]); //boundFor.direction is from data/index.js "N", "S", "L", ..
  return (dispatch) => {
    dispatch({ type: FETCH_ARRIVAL_TIME });
    const stopId = trainstop.stpId[boundFor.direction] || trainstop.stpId[boundFor.direction2] //if not "N" and "S" try "E" and "W";
    // console.log(trainline)
    const routeName = trainline.rt; // route name to filter out other line arrivals
    // console.log(routeName)
    const url = `http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${CTA_API_KEY}&stpid=${stopId}&rt=${routeName}&outputType=JSON&max=3`;
    // console.log(url);

    fetch(url)
      .then((data)=>data.json())
      .catch(error => console.error('Error:', error))
      .then((data)=> {
        dispatch(arrivalTimeSuccess(data.ctatt))
      })

  }
}

export const arrivalTimeSuccess = (data) => {
  // console.log(data)
  return (dispatch) => {
    dispatch({
      type: FETCH_ARRIVAL_TIME_SUCCESS,
      payload: data
    });
    if (!data.eta) { //if there is no arrival data
      dispatch({ type: NOTIFY_NO_ARRIVALS })
    }
  }
}

export const fetchFollowTrainAPIData = ({ departureStop, arrivalStop, departureStopArrivaltime, route }) => {
  const routeName = route.name;
  console.log(departureStop, arrivalStop, departureStopArrivaltime, routeName)
  return (dispatch) => {
    dispatch({ type: FOLLOW_TRAIN });

    const runnumber = departureStopArrivaltime.rn;
    console.log("runnumber: ", runnumber)
    const url = `http://lapi.transitchicago.com/api/1.0/ttfollow.aspx?key=${CTA_API_KEY}&runnumber=${runnumber}&outputType=JSON`;
    // console.log(url);
    fetch(url)
      .then((data)=>data.json())
      .catch(error => console.error('Error:', error))
      .then((data)=>{
        console.log('data from CTA follow train', data.ctatt);
        if (data.ctatt.errCd === "0") {
          let departureStopData = data.ctatt.eta.find((stop) => stop.staId == departureStop.staId);
          // used == instead of ===, because one is number and the other is string
          let arrivalStopData = data.ctatt.eta.find((stop) => stop.staId == arrivalStop.staId);

          if (!departureStopData) {
          //if CTA follow this train API does not include the departure stop data because the train already departed the stop
            departureStopData = departureStopArrivaltime;
          }
          const tripDepartureTime = { routeName, stop: departureStopData.staNm, arrT: departureStopData.arrT, departureStopData };


          if (!arrivalStopData) {
            //if CTA follow this train API does not include arrival stop data because it only contains data for 9~10 stops in the api.
            //if that's the case, use CTA schedule table (google Maps API) to estimate time it takes from the last CTA stop data available and add duration time
            //from the last stop to destination stop

            const lastStopDataCtaApiCanGive = data.ctatt.eta[data.ctatt.eta.length - 1];
            // console.log(lastStopDataCtaApiCanGive);
            const lastStop = {
              name: lastStopDataCtaApiCanGive.staNm,
              stpId: lastStopDataCtaApiCanGive.stpId,
              arrT: lastStopDataCtaApiCanGive.arrT,
              boundFor: departureStop.boundFor
            }
            console.log(lastStop)
            const arrivalStopStpId = arrivalStop.stpId[departureStop.boundFor.direction] || arrivalStop.stpId[departureStop.boundFor.direction2];
            //if departureStop.boundFor.direction is L and the arrival stop is not in the loop it needs to be N or S, direction2 is direction after the loop (from StopList.js)
            //also in case of Orange line, leaving from South to Loop needs to change direction from N to L

            const tripDurationInMin = estimateTravelTimeUsingScheduleTable(lastStop, arrivalStop, route);

            console.log('trip duration', tripDurationInMin, 'min');

            const arrivalStopArrTime = moment(lastStopDataCtaApiCanGive.arrT).add(tripDurationInMin, 'minutes').format('YYYY-MM-DDTHH:mm:ss')
            console.log(arrivalStopArrTime);

            const tripArrivalTimeFromCTAandTimeTable = { routeName, stop: arrivalStop.name, arrT: arrivalStopArrTime };
            dispatch(followThisTrainSuccess({ tripDepartureTime, tripArrivalTime: tripArrivalTimeFromCTAandTimeTable }));


            /// calculating googleapis data for comparison
            // const lastStopName = lastStopDataCtaApiCanGive.staNm;
            // const arrivalStopName = arrivalStop.name;
            // const googleMapsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=cta+${routeName}+${lastStopName}&destination=cta+${routeName}+${arrivalStopName}&key=${Google_Maps_API_KEY}&mode=transit`;
            // fetch(googleMapsUrl)
            //   .then((data)=>data.json())
            //   .catch(error => console.error('Error:', error))
            //   .then((data)=>{
            //     const tripDurationInSec = data.routes[0].legs[0].duration.value;
            //     console.log(tripDurationInSec, 'sec');
            //     arrivalStopData = {staNm: arrivalStop.name, arrT: moment(lastStopDataCtaApiCanGive.arrT).add(tripDurationInSec, 'seconds').format('YYYY-MM-DDTHH:mm:ss')}
            //     console.log(arrivalStopData);
            //     // const tripArrivalTimeFromCTAandGoogle = { routeName, stop: arrivalStopData.staNm, arrT: arrivalStopData.arrT };
            //     // dispatch(followThisTrainSuccess({ tripDepartureTime, tripArrivalTime: tripArrivalTimeFromCTAandGoogle  }));
            //   })


          } else {
            const tripArrivalTimeFromCTAOnly = { routeName, stop: arrivalStopData.staNm, arrT: arrivalStopData.arrT };
            dispatch(followThisTrainSuccess({ tripDepartureTime, tripArrivalTime: tripArrivalTimeFromCTAOnly }));
          }
        } else if (data.ctatt.errCd === "502" || data.ctatt.errCd === "503") {

          departureStop = {...departureStop, stpId: departureStopArrivaltime.stpId, arrT: departureStopArrivaltime.arrT} //replace stpId object with stpId number from API
          const tripDurationInMin = estimateTravelTimeUsingScheduleTable(departureStop, arrivalStop, route);
          console.log('after 502 error', tripDurationInMin);
          const arrivalStopArrTime = moment(departureStopArrivaltime.arrT).add(tripDurationInMin, 'minutes').format('YYYY-MM-DDTHH:mm:ss');
          const tripDepartureTime = { routeName, stop: departureStopArrivaltime.staNm, arrT: departureStopArrivaltime.arrT };
          const tripArrivalTime = { routeName, stop: arrivalStop.name, arrT: arrivalStopArrTime }
          dispatch(followThisTrainSuccess({ tripDepartureTime, tripArrivalTime }));
          // dispatch(followThisTrainFail())
        }
      })
  }
}

export const followThisTrainSuccess = ({ tripDepartureTime, tripArrivalTime }) => {
  return {
    type: FOLLOW_TRAIN_SUCCESS,
    payload: { tripDepartureTime, tripArrivalTime }
  }
}

export const followThisTrainFail = () => {
  return {
    type: FOLLOW_TRAIN_FAIL
  }
}

export const fetchTrip = ({ departureStop, arrivalStop, route }) => {
  // console.log('stop platform id: ', departureStop.stpId[departureStop.boundFor.direction]); //departureStop.boundFor.direction is from data/index.js "N", "S", "L", ..
  console.log("I am in fetchTrip", route, arrivalStop, departureStop);
  //fetch arrival time
  const routeName = route.rt;
  const stopId = departureStop.stpId[departureStop.boundFor.direction] || departureStop.stpId[departureStop.boundFor.direction2] //if not "N" and "S" try "E" and "W";
  const url = `http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${CTA_API_KEY}&stpid=${stopId}&rt=${routeName}&outputType=JSON&max=3`;
  // console.log(url);
  return (dispatch) => {
    fetch(url) //fetch arrival times for departure stop first
      .then((data)=>data.json())
      .catch(error => console.error('Error:', error))
      .then((data)=> {
        const departureStopArrivaltime = data.ctatt.eta[0];
        console.log(route, data.ctatt);

        if(!data.ctatt.eta) { //if no arrival time data for departure stop
          dispatch(fetchTripFail('No Service in 30 min'))
        } else {
          // call isPurpleExpress(arrivaldata) and dispatch with updated route.isPurpleExp
          let isPurpleExp = false;
          if (departureStopArrivaltime.rt === 'P') { //if route is purple line
            isPurpleExp = isPurpleExpress(departureStopArrivaltime);
            route = {...route, isPurpleExp};
            console.log(route);
            const isSavedTripPurpleExpress = () => { //check if the arrival stop is stop in the express branch
              const tripDepartureStopIndex = trainLines[5].stops.findIndex((stop) =>
                stop.staId === arrivalStop.staId
              )
              console.log(tripDepartureStopIndex);
              return (tripDepartureStopIndex > 8); //tripDepartureStopIndex for Howard is 8
            }

            if (isSavedTripPurpleExpress() && !route.isPurpleExp) {
              dispatch(fetchTripFail('No service in 30 min'))
            } else {
              dispatch(fetchFollowTrainAPIData({ departureStop, arrivalStop, departureStopArrivaltime, route }))
            }
          } else { // if train route is not purple
            dispatch(fetchFollowTrainAPIData({ departureStop, arrivalStop, departureStopArrivaltime, route }))
          }
        }
      })
  }
}

export const fetchTripFail = (error) => {
  return {
    type: FETCH_TRIP_FAIL,
    payload: error
  }
}
