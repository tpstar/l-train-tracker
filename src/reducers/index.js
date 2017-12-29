import { combineReducers } from 'redux';
import navReducer from './navReducer';
import trainStopReducer from './trainStopReducer';
import arrivalTimeReducer from './arrivalTimeReducer';

export default combineReducers({
  nav: navReducer,
  favtrainstops: trainStopReducer,
  arrivaltimes: arrivalTimeReducer,
})
