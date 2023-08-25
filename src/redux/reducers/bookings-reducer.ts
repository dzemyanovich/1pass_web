import { SET_BOOKINGS } from '../action-types';

const initialState = [];

// todo: add types
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BOOKINGS: {
      return action.payload;
    }
    default:
      return state;
  }
}
