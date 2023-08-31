import { PayloadAction } from '@reduxjs/toolkit'

import { SET_ADMIN_DATA } from '../action-types';

const initialState = null;

export default function (state = initialState, action: PayloadAction<AdminData>): AdminData {
  switch (action.type) {
    case SET_ADMIN_DATA: {
      return action.payload;
    }
    default:
      return state;
  }
}
