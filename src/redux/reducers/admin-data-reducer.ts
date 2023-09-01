import { PayloadAction } from '@reduxjs/toolkit'

import { SET_ADMIN_DATA, SET_VISIT_TIME } from '../action-types';

const initialState = null;

// todo: add type to state
// todo: do not use any
export default function (state: AdminData = initialState, action: PayloadAction<any>): AdminData {
  switch (action.type) {
    case SET_ADMIN_DATA: {
      return action.payload;
    }
    // todo: consider separate reducer
    case SET_VISIT_TIME: {
      const { visitTime, booking }: { visitTime: string, booking: AdminBooking } = action.payload;
      const bookings = state.bookings.map((item: AdminBooking) => {
        return item.id === booking.id
          ? {
            ...item,
            visitTime,
          }
          : item;
      });

      return {
        ...state,
        bookings,
      };
    }
    default:
      return state;
  }
}
