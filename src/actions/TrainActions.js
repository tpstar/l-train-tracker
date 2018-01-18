import { CREATE_FAV_STOP, FETCH_ARRIVAL_TIME, FOLLOW_TRAIN_SUCCESS } from './types';
import { CTA_API_KEY } from '../config';

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

export const followThisTrain = ({ runnumber, departureStop, arrivalStop }) => {
  const url = `http://lapi.transitchicago.com/api/1.0/ttfollow.aspx?key=${CTA_API_KEY}&runnumber=${runnumber}&outputType=JSON`;
  return (dispatch) => {
    fetch(url)
      .then((data)=>data.json())
      .catch(error => console.error('Error:', error))
      .then((data)=>{
        console.log(data.ctatt.eta, data.ctatt.eta.find((stop)=>stop.staId==arrivalStop.staId), arrivalStop.staId);
        const isDestinationStopInCTAFollowThisTrainAPI = data.ctatt.eta.some((stop)=>stop.staId==arrivalStop.staId);
        console.log(isDestinationStopInCTAFollowThisTrainAPI);
        dispatch(followThisTrainSuccess(data.ctatt));
      })
  }
}

export const followThisTrainSuccess = (data) => {
  return {
    type: FOLLOW_TRAIN_SUCCESS,
    payload: data
  }
}

export const googleArrivalTime = ({ arrivalStop }) => {

}
