import { applyMiddleware, createStore, compose } from 'redux';
// import { createLogger } from 'redux-logger';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { autoRehydrate } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

const middlewares = [ ReduxThunk ];

// if (__DEV__) {
//   middlewares.push(createLogger());
// }

// const store = createStore(
//   reducers,
//   {},
//   compose(applyMiddleware(ReduxThunk), autoRehydrate()),
// );

export default createStore(
  reducers,
  {},
  compose(applyMiddleware(...middlewares), autoRehydrate()),
);
