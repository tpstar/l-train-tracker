import {
  FETCH_ARRIVAL_TIME,
  FETCH_ARRIVAL_TIME_SUCCESS,
  NOTIFY_NO_ARRIVALS
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  loading: false,
  tmst: '', //time stamp updated time
  eta: [] //estimated arrival time data from CTA
};

export default (state = INITIAL_STATE, action) => {
  // console.log('state: ', state, 'action: ', action);
  switch (action.type) {
    case FETCH_ARRIVAL_TIME:
      return { ...INITIAL_STATE, loading: true, error: '' };
    case FETCH_ARRIVAL_TIME_SUCCESS:
      return { ...state, ...INITIAL_STATE, ...action.payload};
    case NOTIFY_NO_ARRIVALS:
      return { ...state, error: 'No Arrivals in 30 min'}
    default:
      return state;
  }
}
