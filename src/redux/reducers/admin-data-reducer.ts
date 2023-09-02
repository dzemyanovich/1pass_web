import { PayloadAction } from '@reduxjs/toolkit'

import { SET_ADMIN_DATA, SET_VISIT_TIME } from '../action-types';
import { isToday } from '../../utils/utils';

const initialState = null;

export default function (
  state: AdminDataVM = initialState,
  action: PayloadAction<AdminData | VisitTimePaylod>
): AdminDataVM {
  switch (action.type) {
    case SET_ADMIN_DATA: {
      const { username, sportObject, bookings } = action.payload as AdminData;
      const todayBookings: AdminBooking[] = [];
      const pastBookings: AdminBooking[] = [];

      bookings.forEach((booking: AdminBooking) => {
        if (isToday(booking.bookingTime)) {
          todayBookings.push(booking);
        } else {
          pastBookings.push(booking);
        }
      });

      return {
        username,
        sportObject,
        todayBookings,
        pastBookings,
      }
    }

    case SET_VISIT_TIME: {
      const { visitTime, booking } = action.payload as VisitTimePaylod;
      const todayBookings = state.todayBookings.map((item: AdminBooking) => {
        return item.id === booking.id
          ? {
            ...item,
            visitTime,
          }
          : item;
      });

      return {
        ...state,
        todayBookings,
      };
    }
 
    default:
      return state;
  }
}
