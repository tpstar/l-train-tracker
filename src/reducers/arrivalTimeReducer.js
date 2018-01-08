import { FETCH_ARRIVAL_TIME } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ARRIVAL_TIME:
      return action.payload;
    default:
      return state;
  }
}
