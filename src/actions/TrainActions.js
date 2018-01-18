import moment from 'moment';
import { CREATE_FAV_STOP, FETCH_ARRIVAL_TIME, FOLLOW_TRAIN_SUCCESS } from './types';
import { CTA_API_KEY, Google_Maps_API_KEY } from '../config';


export const createFavStop = ({ trainline, trainstop, boundFor }) => {
  console.log(trainline, trainstop, boundFor);
  return  {
    type: CREATE_FAV_STOP,
    payload: { trainline, trainstop, boundFor }
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
  return (dispatch) => {
    fetch(url)
      .then((data)=>data.json())
      .catch(error => console.error('Error:', error))
      .then((data)=>{
        console.log(data.ctatt);
        let departureStopData = data.ctatt.eta.find((stop) => stop.staId == departureStop.staId);
        // used == instead of ===, because one is number and the other is string
        let arrivalStopData = data.ctatt.eta.find((stop) => stop.staId == arrivalStop.staId);

        console.log(!!departureStopData, !!arrivalStopData);
        if (!departureStopData) {
        //if follow this train API does not include the departure stop data because the train already departed the stop
          departureStopData = departureStopArrivaltime;
        }
        const tripDepartureTime = { routeName, stop: departureStopData.staNm, arrT: moment(departureStopData.arrT).format('h:mm a')};
        if (!arrivalStopData) {
          const lastStopDataCtaApiCanGive = data.ctatt.eta[data.ctatt.eta.length - 1];
          const lastStopName = lastStopDataCtaApiCanGive.staNm;
          const arrivalStopName = arrivalStop.name;
          const googleMapsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=cta+${routeName}+${lastStopName}&destination=cta+${routeName}+${arrivalStopName}&key=${Google_Maps_API_KEY}&mode=transit`;
          fetch(googleMapsUrl)
            .then((data)=>data.json())
            .catch(error => console.error('Error:', error))
            .then((data)=>{
              const tripDurationInSec = data.routes[0].legs[0].duration.value;
              console.log(tripDurationInSec, 'sec')
            })
          }
        const tripArrivalTime = { routeName, stop: arrivalStopData.staNm, arrT: moment(arrivalStopData.arrT).format('h:mm a')};
        dispatch(followThisTrainSuccess({ tripDepartureTime, tripArrivalTime }));
      })
  }
}

export const followThisTrainSuccess = ({ tripDepartureTime, tripArrivalTime }) => {
  return {
    type: FOLLOW_TRAIN_SUCCESS,
    payload: { tripDepartureTime, tripArrivalTime }
  }
}

export const googleArrivalTime = ({ arrivalStop }) => {

}
