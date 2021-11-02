import { createStore, combineReducers } from 'redux';
import { themeReducer } from './colors';

export const store = createStore(
  combineReducers({
    theme: themeReducer,
  })
);
