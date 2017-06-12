import {
	GET_ORDERED_TICKER_DATA,
} from '../constants';
export default function event(state = {}, action) {
	switch (action.type) {
		case GET_ORDERED_TICKER_DATA:
			return {...state, GET_ORDERED_TICKER_DATA: action.data};
		default:
			return state;
	}
}
