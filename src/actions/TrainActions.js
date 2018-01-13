import { CREATE_FAV_STOP, FETCH_ARRIVAL_TIME } from './types';
import { CTA_API_KEY } from '../config';

export const createFavStop = ({ trainline, trainstop, boundFor }) => {
  console.log(trainline, trainstop, boundFor);
  return  {
    type: CREATE_FAV_STOP,
    payload: { trainline, trainstop, boundFor }
  }
}

export const arrivalTimeFetch = ({ trainline, trainstop, boundFor }) => {
  console.log(trainstop.stpId[boundFor.direction]); //boundFor.direction is from data/index.js "N", "S", "L", ..
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
