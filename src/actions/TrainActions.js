import { CREATE_FAV_STOP } from './types';

export const createFavStop = ({trainline}) => {
  console.log(trainline)
  return  {
    type: CREATE_FAV_STOP
  }
}
