import { combineReducers } from 'redux';
import navReducer from './navReducer';
import favStopReducer from './favStopReducer';
import arrivalTimeReducer from './arrivalTimeReducer';

export default combineReducers({
  nav: navReducer,
  favstops: favStopReducer,
  arrivaldata: arrivalTimeReducer,
})
