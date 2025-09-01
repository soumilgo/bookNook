// src/redux/rootReducer.js
import { combineReducers } from 'redux';
import {sidebarReducer} from './reducer';

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
});

export default rootReducer;
