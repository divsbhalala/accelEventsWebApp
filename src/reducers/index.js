import { combineReducers } from 'redux';
import user from './user';
import event from './event';
import runtime from './runtime';
import { sessionReducer } from 'redux-react-session';
export default combineReducers({
  user,
  event,
  runtime,
  session: sessionReducer
});
