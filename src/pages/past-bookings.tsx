import * as React from 'react';
import { useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { formatDate } from '../utils/format';

export default function PastBookings() {
  const bookings: AdminBooking[] = useSelector((state: ReduxState) => state.adminData.pastBookings);

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Past Bookings
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Booking Time</TableCell>
            <TableCell>Visit Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.length === 0 && (
            <TableRow>
              <TableCell colSpan={6}>No bookings found</TableCell>
            </TableRow>
          )}
          {bookings.map((adminBooking: AdminBooking) => (
            <TableRow key={adminBooking.id}>
              <TableCell>{adminBooking.user.firstName}</TableCell>
              <TableCell>{adminBooking.user.lastName}</TableCell>
              <TableCell>{adminBooking.user.phone}</TableCell>
              <TableCell>{adminBooking.user.email}</TableCell>
              <TableCell>{formatDate(adminBooking.bookingTime)}</TableCell>
              <TableCell>{formatDate(adminBooking.visitTime)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
