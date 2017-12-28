import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import AppNavigation from './navigation';
import reducers from './reducers';

class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    )
  }
}

export default App;
