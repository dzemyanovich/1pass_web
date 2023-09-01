import { PayloadAction } from '@reduxjs/toolkit'

import { SET_ADMIN_DATA, SET_VISIT_TIME } from '../action-types';

const initialState = null;

export default function (
  state: AdminData = initialState,
  action: PayloadAction<AdminData | VisitTimePaylod>
): AdminData {
  switch (action.type) {
    case SET_ADMIN_DATA: {
      return action.payload as AdminData;
    }
    case SET_VISIT_TIME: {
      const { visitTime, booking } = action.payload as VisitTimePaylod;
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
