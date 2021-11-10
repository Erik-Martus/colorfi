import { createStore, combineReducers } from 'redux';
import { themeReducer } from './colors';

export const store = createStore(
  combineReducers({
    theme: themeReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
