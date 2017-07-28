import {
	STORE_HOST_DATA,
} from '../constants';
export default function event(state = {}, action) {
	switch (action.type) {
		case STORE_HOST_DATA:
			return {...state, data: action.data};
		default:
			return state;
	}
}
