import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import firebase from 'firebase';
// import ReduxThunk from 'redux-thunk';
import AppNavigation from './navigation';
import reducers from './reducers';

class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <AppNavigation />
      </Provider>
    )
  }
}

export default App;
