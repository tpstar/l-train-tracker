import { CREATE_FAV_STOP } from './types';

export const createFavStop = ({ trainline, trainstop, destination }) => {
  console.log(trainline, trainstop, destination);
  return  {
    type: CREATE_FAV_STOP,
    payload: { trainline, trainstop, destination }
  }
}
