import {
	LOCATION,
} from '../constants';
export default function location(state = {}, action) {
	switch (action.type) {
		case LOCATION:
			return {...state, data: action.data};
		default:
			return state;
	}
}
