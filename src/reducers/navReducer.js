import AppNavigator from "../navigation/AppNavigator";

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('FavStopList')
);

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

export default navReducer;
