import {combineReducers} from 'redux';
import user from './user';
import event from './event';
import order from './order';
import runtime from './runtime';
import {sessionReducer} from 'redux-react-session';
import {reducer as toastrReducer} from 'react-redux-toastr';
export default combineReducers({
  user,
  event,
  order,
  runtime,
  session: sessionReducer,
  toastr: toastrReducer
});
