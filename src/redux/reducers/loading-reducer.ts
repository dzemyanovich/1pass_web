import { PayloadAction } from '@reduxjs/toolkit'

import { SET_LOADING } from '../action-types';

const initialState = true;

export default function (state: boolean = initialState, action: PayloadAction<boolean>): boolean {
  switch (action.type) {
    case SET_LOADING: {
      return action.payload;
    }
    default:
      return state;
  }
}
