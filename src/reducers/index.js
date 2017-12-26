import { combineReducers } from 'redux';
import navReducer from './navReducer';
import trainStopReducer from './trainStopReducer';

export default combineReducers({
  nav: navReducer,
  trainstops: trainStopReducer,
})
