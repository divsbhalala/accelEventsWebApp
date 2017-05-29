import {STORE_EVENT, STORE_EVENT_TICKET} from '../constants';
export default function event(state = {}, action) {
  switch (action.type) {
    case STORE_EVENT: return {...state, data:action.data};
    case STORE_EVENT_TICKET: return {...state, ticket_data:action.data};
    default:
      return state;
  }
}
