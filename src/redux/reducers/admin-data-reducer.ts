import { SET_ADMIN_DATA } from '../action-types';

const initialState = [];

// todo: add types
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ADMIN_DATA: {
      return action.payload;
    }
    default:
      return state;
  }
}
