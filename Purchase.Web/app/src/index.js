import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import './index.css';
import App from './App';

import { default as ReduxThunk } from 'redux-thunk'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { purchaseReducer } from './reducers/purchaseReducer';
import page from './reducers/page';
import { combineReducers } from 'redux';
const reducer = combineReducers({ page, purchaseReducer });

const logger = createLogger()
const initialState = {
    fetching: false
}

const store = createStore(reducer, initialState, applyMiddleware(thunk, logger));


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker();
