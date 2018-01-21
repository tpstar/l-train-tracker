import { CREATE_FAV_STOP, DELETE_FAV_STOP } from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  console.log(state);
  switch (action.type) {
    case CREATE_FAV_STOP:
      return [...state, action.payload];
    case DELETE_FAV_STOP:
      return [...state.filter(stop => stop != action.payload)]
    default:
      return state;
  }
}
