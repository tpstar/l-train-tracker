import { combineReducers } from 'redux';
import navReducer from './navReducer';
import favStopReducer from './favStopReducer';
import favTripReducer from './favTripReducer';
import arrivalTimeReducer from './arrivalTimeReducer';
import tripdataReducer from './tripdataReducer';

export default combineReducers({
  nav: navReducer,
  favstops: favStopReducer,
  favtrips: favTripReducer,
  arrivaldata: arrivalTimeReducer,
  tripdata: tripdataReducer,
})
