import * as React from 'react';
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { formatDate } from '../utils/format';
import { isToday } from '../utils/utils';

export default function TodayBookings() {
  // todo: do not use any
  const bookings: AdminBooking[] = useSelector((state: any) => state
    .adminData
    .bookings
    .filter((booking: AdminBooking) => isToday(booking.bookingTime)));

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Today Bookings
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
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking: AdminBooking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.user.firstName}</TableCell>
              <TableCell>{booking.user.lastName}</TableCell>
              <TableCell>{booking.user.phone}</TableCell>
              <TableCell>{booking.user.email}</TableCell>
              <TableCell>{formatDate(booking.bookingTime)}</TableCell>
              <TableCell>{formatDate(booking.visitTime)}</TableCell>
              <TableCell>
                {!booking.visitTime && (
                  <Button
                    type="submit"
                    variant="text"
                  >
                    Confirm visit
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
