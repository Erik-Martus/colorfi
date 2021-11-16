import { createStore } from 'redux';
import undoable from 'redux-undo';
import colorReducer from './colors';

export const store = createStore(
  undoable(colorReducer),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
