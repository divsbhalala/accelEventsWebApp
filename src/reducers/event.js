import {STORE_EVENT, STORE_EVENT_TICKET,STORE_EVENT_RAFFLE,STORE_EVENT_FUND_A_NEED,STORE_EVENT_TICKET_DONATION, STORE_EVENT_AUCTION} from '../constants';
export default function event(state = {}, action) {
  switch (action.type) {
    case STORE_EVENT: return {...state, data:action.data};
    case STORE_EVENT_TICKET: return {...state, ticket_data:action.data};
    case STORE_EVENT_RAFFLE: return {...state, raffle_data:action.data};
    case STORE_EVENT_FUND_A_NEED: return {...state, fund_data:action.data};
    case STORE_EVENT_TICKET_DONATION: return {...state, donation_data:action.data};
    case STORE_EVENT_AUCTION: return {...state, donation_data:action.data};
    default:
      return state;
  }
}
