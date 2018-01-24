import moment from 'moment';
import { CREATE_FAV_STOP, CREATE_FAV_TRIP, FETCH_ARRIVAL_TIME, FOLLOW_TRAIN_SUCCESS, FOLLOW_TRAIN_FAIL, DELETE_FAV_STOP } from './types';
import { CTA_API_KEY, Google_Maps_API_KEY } from '../config';


export const createFavStop = ({ trainline, trainstop, boundFor }) => {
  console.log(trainline, trainstop, boundFor);
  return  {
    type: CREATE_FAV_STOP,
    payload: { trainline, trainstop, boundFor }
  }
}

export const createFavTrip = ({ departureStop, arrivalStop, route }) => {
  console.log(departureStop, arrivalStop, route);
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
  return (dispatch) => {
    fetch(url)
      .then((data)=>data.json())
      .catch(error => console.error('Error:', error))
      .then((data)=>{
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

export const followThisTrain = ({ departureStop, arrivalStop, departureStopArrivaltime, routeName }) => {
  const runnumber = departureStopArrivaltime.rn;
  console.log(departureStop, arrivalStop, departureStopArrivaltime, routeName)
  const url = `http://lapi.transitchicago.com/api/1.0/ttfollow.aspx?key=${CTA_API_KEY}&runnumber=${runnumber}&outputType=JSON`;
  // console.log(url);
  return (dispatch) => {
    fetch(url)
      .then((data)=>data.json())
      .catch(error => console.error('Error:', error))
      .then((data)=>{
        console.log(data.ctatt);
        if (data.ctatt.errCd === "0") {
          let departureStopData = data.ctatt.eta.find((stop) => stop.staId == departureStop.staId);
          // used == instead of ===, because one is number and the other is string
          let arrivalStopData = data.ctatt.eta.find((stop) => stop.staId == arrivalStop.staId);

          console.log(!!departureStopData, !!arrivalStopData);
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
            const lastStopName = lastStopDataCtaApiCanGive.staNm;
            const arrivalStopName = arrivalStop.name;
            const googleMapsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=cta+${routeName}+${lastStopName}&destination=cta+${routeName}+${arrivalStopName}&key=${Google_Maps_API_KEY}&mode=transit`;
            fetch(googleMapsUrl)
              .then((data)=>data.json())
              .catch(error => console.error('Error:', error))
              .then((data)=>{
                const tripDurationInSec = data.routes[0].legs[0].duration.value;
                console.log(tripDurationInSec, 'sec');
                arrivalStopData = {staNm: arrivalStopName, arrT: moment(lastStopDataCtaApiCanGive.arrT).add(tripDurationInSec, 'seconds').format('YYYY-MM-DDTHH:mm:ss')}
                console.log(lastStopName, arrivalStopData);
                const tripArrivalTimeFromCTAandGoogle = { routeName, stop: arrivalStopData.staNm, arrT: arrivalStopData.arrT };
                dispatch(followThisTrainSuccess({ tripDepartureTime, tripArrivalTime: tripArrivalTimeFromCTAandGoogle  }));
              })

          } else {
            const tripArrivalTimeFromCTAOnly = { routeName, stop: arrivalStopData.staNm, arrT: arrivalStopData.arrT };
            dispatch(followThisTrainSuccess({ tripDepartureTime, tripArrivalTime: tripArrivalTimeFromCTAOnly }));
          }
        } else if (data.ctatt.errCd === "502") {
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
