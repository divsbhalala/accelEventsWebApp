import {
  IS_ITEMADDED,
} from '../constants';
export default function event(state = {}, action) {
  switch (action.type) {
    case IS_ITEMADDED:
      return {...state, isItemAdded:{"type":action.data[0],"status":action.data[1]}};
    default:
      return state;
  }
}
