import { SET_LOADING } from '../action-types';

const initialState = true;

// todo: add types
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING: {
      return action.payload;
    }
    default:
      return state;
  }
}
