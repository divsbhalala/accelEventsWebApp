import {
  IS_ITEMADDED,ITEMADD_SETTING,
} from '../constants';
export default function event(state = {}, action) {
  switch (action.type) {
    case IS_ITEMADDED:
      return {...state, isItemAdded:{"type":action.data[0],"status":action.data[1]}};
    case ITEMADD_SETTING:
      return {...state,itemAddSetting:action.data};
    default:
      return state;
  }
}
