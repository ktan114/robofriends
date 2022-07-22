import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import 'tachyons';
import { searchRobots, requestRobots } from './reducers';

import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './containers/App';

const rootReducer = combineReducers({ searchRobots, requestRobots });

/* Middleware goes in order
  Redux-Thunk handle async actions, side effects
  Checks if an action returns a function instead of an object
  Logger catches actions of previous state, action, next state
*/
const logger = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger),
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
