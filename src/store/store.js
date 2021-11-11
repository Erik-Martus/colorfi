import { createStore } from 'redux';
import { themeReducer } from './colors';

export const store = createStore(
  themeReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
