import {combineReducers} from 'redux';
import user from './user';
import event from './event';
import order from './order';
import runtime from './runtime';
import isItemAdded from './itemAdd';
import {sessionReducer} from 'redux-react-session';
import { loadingBarReducer } from 'react-redux-loading-bar'
export default combineReducers({
  user,
  event,
  order,
  runtime,
  isItemAdded,
  session: sessionReducer,
  loadingBar: loadingBarReducer,
});
