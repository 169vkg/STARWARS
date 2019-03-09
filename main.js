import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import searchReducer from './src/Store/Reducers/searchReducer'
import Root from './Root'

const rootReducer = combineReducers ({
  searchRed : searchReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(<Root store={store} />, document.getElementById('app'));
