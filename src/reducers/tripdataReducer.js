import { FOLLOW_TRAIN_SUCCESS, FOLLOW_TRAIN_FAIL, FOLLOW_TRAIN } from '../actions/types';

const INITIAL_STATE = {
  error: '',
  loading: false,
  tripDepartureTime:  {},
  tripArrivalTime: {}
};

export default (state = INITIAL_STATE, action) => {
  // console.log(state);
  switch (action.type) {
    case FOLLOW_TRAIN_SUCCESS:
      return { ...INITIAL_STATE, ...action.payload };
    case FOLLOW_TRAIN_FAIL: //catch 502 error from CTA
      return { ...state, loading: false, error: 'Train tracking data are not available at this time, please try again later!' }
    case FOLLOW_TRAIN:
      return { ...state, loading: true };
    default:
      return state;
  }
}
