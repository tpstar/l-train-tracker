import { FETCH_ARRIVAL_TIME, FETCH_ARRIVAL_TIME_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ARRIVAL_TIME:
      return { ...state, loading: true, error: '' };
    case FETCH_ARRIVAL_TIME_SUCCESS:
      return { ...state, ...INITIAL_STATE, ...action.payload };
    default:
      return state;
  }
}
