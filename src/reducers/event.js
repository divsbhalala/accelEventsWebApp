import {STORE_DASD} from '../constants';
export default function event(state = {}, action) {
  switch (action.type) {
    case STORE_DASD: return {...state, activeTab:action.data};
    default:
      return state;
  }
}
