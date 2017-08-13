import {
  STORE_WHITE_LABLE_SETTING,
} from '../constants';
export default function event(state = {}, action) {
  switch (action.type) {
    case STORE_WHITE_LABLE_SETTING:
      return {...state, whiteLableSetting:action.data};
    default:
      return state;
  }
}
