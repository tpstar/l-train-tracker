import moment from 'moment';
import {
  FOLLOW_TRAIN,
  FOLLOW_TRAIN_SUCCESS,
  FOLLOW_TRAIN_FAIL,
  FETCH_TRIP_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  loading: false,
  tripDepartureTime:  {}, // e.g. {routeName: "blue", stop: "Harlem (Forest Park Branch)", arrT: "2018-02-09T23:06:29"}
  tripArrivalTime: {} // e.g. {arrT: "2018-02-09T23:07:29", routeName: "blue", stop: "Forest Park"};
}

export default (state = INITIAL_STATE, action) => {
  // console.log('state: ', state, 'action: ', action);
  switch (action.type) {
    case FOLLOW_TRAIN:
      return { ...INITIAL_STATE, loading: true };
    case FOLLOW_TRAIN_SUCCESS:
      return { ...state, ...INITIAL_STATE, ...action.payload, timestamp: moment() };
    case FOLLOW_TRAIN_FAIL: //catch 502 error from CTA, used schedule table to take care of 502 error
      return { ...state, loading: false, error: 'Train tracking data are not available at this time, please try again later!' }
    case FETCH_TRIP_FAIL:
      console.log(action.payload)
      return { ...state, error: action.payload, loading: false }
    default:
      return state;
  }
}
