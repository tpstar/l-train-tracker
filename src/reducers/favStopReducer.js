import { CREATE_FAV_STOP, FETCH_ARRIVAL_TIME } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  // console.log(state);
  switch (action.type) {
    case CREATE_FAV_STOP:
      return [...state, action.payload];
    default:
      return state;
  }
}
