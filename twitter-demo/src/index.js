import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {ApolloProvider} from '@apollo/react-hooks'
import client from './apollo_client'
import store from './store/store_config'
import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './App';


window.store = store

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
