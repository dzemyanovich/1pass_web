import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// todo: add loading screen
export default function Bookings() {
  // todo: use redux
  const bookings: AdminBooking[] = JSON.parse(sessionStorage.bookings);

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Bookings
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
              <TableCell>{booking.bookingTime.toString()}</TableCell>
              <TableCell>{booking.visitTime?.toString()}</TableCell>
              <TableCell>
                {!booking.visitTime && (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
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
