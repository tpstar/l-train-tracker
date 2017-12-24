import { CREATE_FAV_STOP } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_FAV_STOP:
      console.log('I am in trainReducer!');
      return state;
    default:
      return state;
  }
}
