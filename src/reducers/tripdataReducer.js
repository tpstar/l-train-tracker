import { FOLLOW_TRAIN_SUCCESS, FOLLOW_TRAIN_FAIL } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FOLLOW_TRAIN_SUCCESS:
      return {...action.payload, error: ''};
    case FOLLOW_TRAIN_FAIL: //catch 502 error from CTA
      return {...state, error: 'CTA data not available this time, try again!'}
    default:
      return state;
  }
}
