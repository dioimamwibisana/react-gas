import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import App from '../common/App';
import 'babel-polyfill';

const render = Component => {
  ReactDOM.hydrate(
    <AppContainer>
      <BrowserRouter>
        <Component/>
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('app')
  )
};

//Render app
render(App);

if (module.hot) {
  module.hot.accept('../common/App', () => {
    const NewClient = require('../common/App');
    render(NewClient);
  })
}
