import { CREATE_FAV_STOP, FETCH_ARRIVAL_TIME } from './types';
import { CTA_API_KEY } from '../config';

export const createFavStop = ({ trainline, trainstop, destination }) => {
  return  {
    type: CREATE_FAV_STOP,
    payload: { trainline, trainstop, destination }
  }
}

export const arrivalTimeFetch = ({ favstop }) => {
  // console.log(favstop);
  const url = `http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${CTA_API_KEY}&mapid=40380&outputType=JSON`
  return (dispatch) => {
    fetch(url)
      .then((data)=>data.json())
      .then((data)=>{
        dispatch(arrivalTimeSuccess(data))
      })
  }
}

export const arrivalTimeSuccess = (data) => {
  return {
    type: FETCH_ARRIVAL_TIME,
    payload: data
  }
}
