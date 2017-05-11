import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import { sessionReducer } from 'redux-react-session';
export default combineReducers({
  user,
  runtime,
  session: sessionReducer
});
