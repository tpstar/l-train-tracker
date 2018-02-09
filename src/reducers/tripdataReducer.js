import { FOLLOW_TRAIN, FOLLOW_TRAIN_SUCCESS, FOLLOW_TRAIN_FAIL } from '../actions/types';

const INITIAL_STATE = {
  error: '',
  loading: false,
  tripDepartureTime:  {},
  tripArrivalTime: {}
};

export default (state = INITIAL_STATE, action) => {
  // console.log('state: ', state, 'action: ', action);
  switch (action.type) {
    case FOLLOW_TRAIN:
      return { ...state, loading: true };
    case FOLLOW_TRAIN_SUCCESS:
      return { ...state, ...INITIAL_STATE, ...action.payload };
    case FOLLOW_TRAIN_FAIL: //catch 502 error from CTA, used schedule table to take care of 502 error
      return { ...state, loading: false, error: 'Train tracking data are not available at this time, please try again later!' }
    default:
      return state;
  }
}
