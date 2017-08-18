import {
  STORE_EVENT,
  STORE_EVENT_TICKET,
  STORE_EVENT_RAFFLE,
  STORE_EVENT_FUND_A_NEED,
  STORE_EVENT_TICKET_DONATION,
  STORE_EVENT_AUCTION,
  STORE_ACTIVE_TAB,
  STORE_ORDER_DATA,
  IS_VOLUNTEER,
  STORE_AUCTION_CACHE,
  STORE_RAFFLE_CACHE,
  STORE_FUND_CACHE,
	STORE_EVENT_CURRENCY,
  STORE_AUCTION_CACHE_OPENED
} from '../constants';
export default function event(state = {}, action) {
  switch (action.type) {
    case STORE_EVENT:
      return {...state, data: action.data};
    case STORE_EVENT_TICKET:
      return {...state, ticket_data: action.data};
    case STORE_EVENT_RAFFLE:
      return {...state, raffle_data: action.data};
    case STORE_EVENT_FUND_A_NEED:
      return {...state, fund_data: action.data};
    case STORE_EVENT_TICKET_DONATION:
      return {...state, donation_data: action.data};
    case STORE_EVENT_AUCTION:
      return {...state, auction_data: action.data};
    case STORE_ACTIVE_TAB:
      return {...state, active_tab_data: action.data};
    case STORE_ORDER_DATA:
      return {...state, order_data: action.data};
    case IS_VOLUNTEER:
      return {...state, is_volunteer: action.data};
    case STORE_AUCTION_CACHE:
      return {...state, auction_cache: action.data};
    case STORE_RAFFLE_CACHE:
      return {...state, raffle_cache: action.data};
    case STORE_FUND_CACHE:
      return {...state, fund_cache: action.data};
    case STORE_AUCTION_CACHE_OPENED:
      return {...state, auction_cache_tab: action.data};
    case STORE_EVENT_CURRENCY:
      return {...state, currencySymbol: action.data};
    default:
      return state;
  }
}
