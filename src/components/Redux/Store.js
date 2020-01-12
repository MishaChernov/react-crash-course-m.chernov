import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {appReducer, state} from './Reducer';

const store = createStore(appReducer, state, composeWithDevTools(
  applyMiddleware()
));

export default store;