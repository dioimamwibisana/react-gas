import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import '../styles/styles.scss';
import App from '../common/app';
import reducers from '../common/reducers';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = (module.hot && module.hot.data && module.hot.data.store)
  ? module.hot.data.store
  : createStore(
    reducers, preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

const contentEl = document.getElementById('app');

hydrate(
  <Provider store={store}>
    <AppContainer>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContainer>
  </Provider>,
  contentEl
);

if (module.hot) {

  module.hot.accept();

  module.hot.dispose((data) => {
    data.store = store;
  });
}
