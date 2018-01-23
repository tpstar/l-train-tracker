import { CREATE_FAV_TRIP } from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  console.log(state);
  switch (action.type) {
    case CREATE_FAV_TRIP:
      return [...state, action.payload];
    // case DELETE_FAV_TRIP:
    //   return [...state.filter(stop => stop != action.payload)]
    default:
      return state;
  }
}
