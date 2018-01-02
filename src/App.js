import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
// import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
// import ReduxThunk from 'redux-thunk';
import AppNavigation from './navigation';
import store from './store';
// import reducers from './reducers';


class App extends Component {

  state = {
    isReady: false
  }

  componentDidMount() {
    persistStore(
      store,
      {
        storage: AsyncStorage,
        blacklist: ['nav']
      },
      () => {
        this.setState({ isReady: true })
      }
    )
  }
  render() {
    // const store = createStore(
    //   reducers,
    //   {},
    //   compose(applyMiddleware(ReduxThunk), autoRehydrate()),
    // );
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    )
  }
}

export default App;
