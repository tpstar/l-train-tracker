import moment from 'moment';
import {
  CREATE_FAV_STOP,
  CREATE_FAV_TRIP,
  FETCH_ARRIVAL_TIME,
  FETCH_ARRIVAL_TIME_SUCCESS,
  FOLLOW_TRAIN,
  FOLLOW_TRAIN_SUCCESS,
  FOLLOW_TRAIN_FAIL,
  DELETE_FAV_STOP } from './types';
import { CTA_API_KEY, Google_Maps_API_KEY } from '../config';
import { timeTables } from '../data/timetable';


const fetchCTAArrivalAPIData = (stopId, routeName) => {
  console.log("fetchCTA: ", stopId, routeName)
  const url = `http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${CTA_API_KEY}&stpid=${stopId}&rt=${routeName}&outputType=JSON&max=3`;
  const CTAArrivalDataPromise = fetch(url)
        .then((data)=>data.json())
        .catch(error => console.error('Error:', error))
        // .then((data)=>data.ctatt)
  return CTAArrivalDataPromise;
}

const estimateTravelTimeUsingScheduleTable = (stopA, stopB, routeName) => {
  console.log(stopA, stopB, routeName);

  const timeTable = timeTables[routeName]["weekdays"]; //[stopA.boundFor.direction]; //don't need a direction since using stpId contains directional info
  const indexOfClosestFutureService = timeTable[stopA.stpId].findIndex((element)=>(moment(element, 'HH:mm A').diff(moment(stopA.arrT)) > 0));
  // console.log(indexOfClosestFutureService, timeTable[stopA.stpId][indexOfClosestFutureService], timeTable[stopA.stpId][indexOfClosestFutureService - 1])
  const diffFutureAndNow = moment(timeTable[stopA.stpId][indexOfClosestFutureService], 'HH:mm A').diff(stopA.arrT);
  const diffPastAndNow = -moment(timeTable[stopA.stpId][indexOfClosestFutureService - 1], 'HH:mm A').diff(stopA.arrT);

  let indexOfClosestService=indexOfClosestFutureService;

  if (diffFutureAndNow > diffPastAndNow && indexOfClosestFutureService != 0) {
    indexOfClosestService = indexOfClosestService - 1;
  }

  const stopB_stpId = stopB.stpId[stopA.boundFor.direction] || stopB.stpId[stopA.boundFor.direction2];

  const scheduledDepartureTime = timeTable[stopA.stpId][indexOfClosestService];
  const scheduledArrivalTime = timeTable[stopB_stpId][indexOfClosestService];
  // console.log(indexOfClosestService, scheduledDepartureTime, scheduledArrivalTime);

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
}

export const createFavTrip = ({ departureStop, arrivalStop, route }) => {
  // console.log(departureStop, arrivalStop, route);
  return  {
    type: CREATE_FAV_TRIP,
    payload: { departureStop, arrivalStop, route }
  }
}

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
  return {
    type: FETCH_ARRIVAL_TIME_SUCCESS,
    payload: data
  }
}

export const fetchFollowTrainAPIData = ({ departureStop, arrivalStop, departureStopArrivaltime, routeName }) => {
  // console.log(departureStop, arrivalStop, departureStopArrivaltime, routeName)
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
          const tripDepartureTime = { routeName, stop: departureStopData.staNm, arrT: departureStopData.arrT };


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
            const arrivalStopStpId = arrivalStop.stpId[departureStop.boundFor.direction] || arrivalStop.stpId[departureStop.boundFor.direction2];
            //if departureStop.boundFor.direction is L and the arrival stop is not in the loop it needs to be N or S, direction2 is direction after the loop (from StopList.js)
            //also in case of Orange line, leaving from South to Loop needs to change direction from N to L

            const tripDurationInMin = estimateTravelTimeUsingScheduleTable(lastStop, arrivalStop, routeName);

            console.log('trip duration', tripDurationInMin, 'min');

            const arrivalStopArrTime = moment(lastStopDataCtaApiCanGive.arrT).add(tripDurationInMin, 'minutes').format('YYYY-MM-DDTHH:mm:ss')
            console.log(arrivalStopArrTime);

            const tripArrivalTimeFromCTAandTimeTable = { routeName, stop: arrivalStop.name, arrT: arrivalStopArrTime };
            dispatch(followThisTrainSuccess({ tripDepartureTime, tripArrivalTime: tripArrivalTimeFromCTAandTimeTable }));


            /// calculating googleapis data for comparison
            const lastStopName = lastStopDataCtaApiCanGive.staNm;
            const arrivalStopName = arrivalStop.name;
            const googleMapsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=cta+${routeName}+${lastStopName}&destination=cta+${routeName}+${arrivalStopName}&key=${Google_Maps_API_KEY}&mode=transit`;
            fetch(googleMapsUrl)
              .then((data)=>data.json())
              .catch(error => console.error('Error:', error))
              .then((data)=>{
                const tripDurationInSec = data.routes[0].legs[0].duration.value;
                console.log(tripDurationInSec, 'sec');
                arrivalStopData = {staNm: arrivalStop.name, arrT: moment(lastStopDataCtaApiCanGive.arrT).add(tripDurationInSec, 'seconds').format('YYYY-MM-DDTHH:mm:ss')}
                console.log(arrivalStopData);
                // const tripArrivalTimeFromCTAandGoogle = { routeName, stop: arrivalStopData.staNm, arrT: arrivalStopData.arrT };
                // dispatch(followThisTrainSuccess({ tripDepartureTime, tripArrivalTime: tripArrivalTimeFromCTAandGoogle  }));
              })


          } else {
            const tripArrivalTimeFromCTAOnly = { routeName, stop: arrivalStopData.staNm, arrT: arrivalStopData.arrT };
            dispatch(followThisTrainSuccess({ tripDepartureTime, tripArrivalTime: tripArrivalTimeFromCTAOnly }));
          }
        } else if (data.ctatt.errCd === "502") {

          departureStop = {...departureStop, stpId: departureStopArrivaltime.stpId} //replace stpId object with stpId number from API
          const tripDurationInMin = estimateTravelTimeUsingScheduleTable(departureStop, arrivalStop, routeName);
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

export const deleteFavStop = (favstop) => {
  return {
    type: DELETE_FAV_STOP,
    payload: favstop
  }
}

export const fetchTrip = ({ departureStop, arrivalStop, route }) => {
  // console.log('stop platform id: ', departureStop.stpId[departureStop.boundFor.direction]); //departureStop.boundFor.direction is from data/index.js "N", "S", "L", ..
  // console.log(route, departureStop)
  const stopId = departureStop.stpId[departureStop.boundFor.direction] || departureStop.stpId[departureStop.boundFor.direction2] //if not "N" and "S" try "E" and "W";
  const routeName = route.name; //e.g. "red"

  const url = `http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${CTA_API_KEY}&stpid=${stopId}&rt=${routeName}&outputType=JSON&max=3`;
  return (dispatch) => {
    fetch(url)
      .then((data)=>data.json())
      .catch(error => console.error('Error:', error))
      .then((data)=> {
        // console.log(data.ctatt.eta)
        dispatch(fetchFollowTrainAPIData({ departureStop, arrivalStop, departureStopArrivaltime: data.ctatt.eta[0], routeName }))
      })
  }
}
