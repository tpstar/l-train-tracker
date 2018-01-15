import { FOLLOW_TRAIN_SUCCESS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FOLLOW_TRAIN_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
