import { combineReducers } from 'redux';
import navReducer from './navReducer';
import favStopReducer from './favStopReducer';
import arrivalTimeReducer from './arrivalTimeReducer';
import followtrainReducer from './followtrainReducer';

export default combineReducers({
  nav: navReducer,
  favstops: favStopReducer,
  arrivaldata: arrivalTimeReducer,
  followtraindata: followtrainReducer,
})
