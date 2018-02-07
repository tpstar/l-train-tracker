import moment from 'moment';
import {
  CREATE_FAV_STOP,
  CREATE_FAV_TRIP,
  FETCH_ARRIVAL_TIME,
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

export const arrivalTimeFetch = ({ trainline, trainstop, boundFor }) => {
  // console.log('stop platform id: ', trainstop.stpId[boundFor.direction]); //boundFor.direction is from data/index.js "N", "S", "L", ..
  const stopId = trainstop.stpId[boundFor.direction] || trainstop.stpId[boundFor.direction2] //if not "N" and "S" try "E" and "W";
  // console.log(trainline)
  const routeName = trainline.rt; // route name to filter out other line arrivals
  // console.log(routeName)
  const url = `http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${CTA_API_KEY}&stpid=${stopId}&rt=${routeName}&outputType=JSON&max=3`;
  // console.log(url);
  return (dispatch) => {
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
    type: FETCH_ARRIVAL_TIME,
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
        // console.log(data.ctatt);
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
            //if that's the case, use google Maps API to estimate time it takes from the last CTA stop data available and add duration time
            //from the last stop to destination stop
            const lastStopDataCtaApiCanGive = data.ctatt.eta[data.ctatt.eta.length - 1];
            console.log(lastStopDataCtaApiCanGive);
            const lastStopName = lastStopDataCtaApiCanGive.staNm;
            const lastStopStpId = lastStopDataCtaApiCanGive.stpId;
            const arrivalStopName = arrivalStop.name;
            const arrivalStopStpId = arrivalStop.stpId[departureStop.boundFor.direction];

            console.log(departureStop.boundFor.direction)
            const timeTable = timeTables[routeName]["weekdays"][departureStop.boundFor.direction];
            console.log(timeTable);
            const lastStopArrTime = lastStopDataCtaApiCanGive.arrT;
            console.log('last stop stpId: ', lastStopStpId, 'arrival stop stpId: ', arrivalStopStpId, 'time table: ', timeTable,  'last stop arrival time: ', lastStopArrTime);

            const indexOfClosestFutureService = timeTable[lastStopStpId].findIndex((element)=>(moment(element, 'HH:mm A').diff(moment(lastStopArrTime)) > 0));
            console.log(indexOfClosestFutureService)
            const diffFutureAndNow = moment(timeTable[lastStopStpId][indexOfClosestFutureService], 'HH:mm A').diff(lastStopArrTime);
            const diffPastAndNow = -moment(timeTable[lastStopStpId][indexOfClosestFutureService - 1], 'HH:mm A').diff(lastStopArrTime);

            let indexOfClosestService=indexOfClosestFutureService;

            if (diffFutureAndNow > diffPastAndNow && indexOfClosestFutureService != 0) {
              indexOfClosestService = indexOfClosestService - 1;
            }

            const scheduledDepartureTime = timeTable[lastStopStpId][indexOfClosestService];
            const scheduledArrivalTime = timeTable[arrivalStopStpId][indexOfClosestService];
            console.log(indexOfClosestService, scheduledDepartureTime, scheduledArrivalTime);

            const tripDurationInMilliSec = moment(scheduledArrivalTime, 'HH:mm A').diff(moment(scheduledDepartureTime, 'HH:mm A'))

            let tripDurationInMin = tripDurationInMilliSec/60000;

            if (tripDurationInMin < -1300) { //if destination arrival time is next day
              tripDurationInMin += 1440
            }

            console.log('trip duration', tripDurationInMin, 'min');
            arrivalStopData = {staNm: arrivalStopName, arrT: moment(lastStopDataCtaApiCanGive.arrT).add(tripDurationInMin, 'minutes').format('YYYY-MM-DDTHH:mm:ss')}
            console.log(arrivalStopData);
            const tripArrivalTimeFromCTAandTimeTable = { routeName, stop: arrivalStopData.staNm, arrT: arrivalStopData.arrT };
            dispatch(followThisTrainSuccess({ tripDepartureTime, tripArrivalTime: tripArrivalTimeFromCTAandTimeTable }));

            const googleMapsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=cta+${routeName}+${lastStopName}&destination=cta+${routeName}+${arrivalStopName}&key=${Google_Maps_API_KEY}&mode=transit`;
            fetch(googleMapsUrl)
              .then((data)=>data.json())
              .catch(error => console.error('Error:', error))
              .then((data)=>{
                const tripDurationInSec = data.routes[0].legs[0].duration.value;
                console.log(tripDurationInSec, 'sec');
                arrivalStopData = {staNm: arrivalStopName, arrT: moment(lastStopDataCtaApiCanGive.arrT).add(tripDurationInSec, 'seconds').format('YYYY-MM-DDTHH:mm:ss')}
                console.log(arrivalStopData);
                // const tripArrivalTimeFromCTAandGoogle = { routeName, stop: arrivalStopData.staNm, arrT: arrivalStopData.arrT };
                // dispatch(followThisTrainSuccess({ tripDepartureTime, tripArrivalTime: tripArrivalTimeFromCTAandGoogle  }));
              })

          } else {
            const tripArrivalTimeFromCTAOnly = { routeName, stop: arrivalStopData.staNm, arrT: arrivalStopData.arrT };
            dispatch(followThisTrainSuccess({ tripDepartureTime, tripArrivalTime: tripArrivalTimeFromCTAOnly }));
          }
        } else if (data.ctatt.errCd === "502") {

          console.log(departureStopArrivaltime);
          dispatch(followThisTrainFail())
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
