import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {appReducer} from './Reducer';

const store = createStore(appReducer, composeWithDevTools(
  applyMiddleware()
));

window.store = store;

export default store;