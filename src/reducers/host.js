import {
	STORE_HOST_DATA,
	STORE_CURRENCY_SYMBOLS,
  STORE_HOST_DESING_DATA,
} from '../constants';
export default function event(state = {}, action) {
	switch (action.type) {
		case STORE_HOST_DATA:
			return {...state, data: action.data};
		case STORE_CURRENCY_SYMBOLS:
			return {...state, currencySymbol: action.data};
			case STORE_HOST_DESING_DATA:
			return {...state, storeDesing: action.data};
		default:
			return state;
	}
}
