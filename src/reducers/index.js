import { combineReducers } from 'redux';
import navReducer from './navReducer';
import trainReducer from './trainReducer';

export default combineReducers({
  nav: navReducer,
  trains: trainReducer,
})
