import {STORE_TOKEN,STORE_LOGIN_DATA,STORE_EVENT} from '../constants';
export default function user(state = {}, action) {
  switch (action.type) {
    case STORE_TOKEN: return {...state,token:action.token};
    case STORE_LOGIN_DATA: return {...state,user_data:action.data};
    default:
      return state;
  }
}
