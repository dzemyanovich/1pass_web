import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ConfirmVisitDialog from '../components/confirm-visit-dialog';
import Toast from '../components/toast';
import { formatDate } from '../utils/format';
import { confirmVisit } from '../utils/api';
import { SET_VISIT_TIME } from '../redux/action-types';

export default function TodayBookings() {
  const [dialogOpen, setDiagloOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [booking, setBooking] = useState(null as AdminBooking);
  const [errors, setErrors] = useState([] as string[]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const bookings: AdminBooking[] = useSelector((state: ReduxState) => state.adminData.todayBookings);

  const openDialog = (adminBooking: AdminBooking) => {
    setBooking(adminBooking);
    setDiagloOpen(true);
  };

  const closeDialog = () => {
    if (!loading) {
      setDiagloOpen(false);
    }
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const confirmVisitRequest = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
    event.preventDefault();
    if (loading) {
      return;
    }

    setLoading(true);
    const response = await confirmVisit(booking.id);
    setLoading(false);
    if (response.success) {
      setErrors([]);
      dispatch({
        type: SET_VISIT_TIME,
        payload: {
          visitTime: response.data,
          booking,
        },
      });
    } else {
      setErrors(response.errors);
    }
    setDiagloOpen(false);
    setSnackbarOpen(true);
  };

  return (
    <>
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
          {bookings.length === 0 && (
            <TableRow>
              <TableCell colSpan={7}>No bookings found</TableCell>
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
              <TableCell>
                {!adminBooking.visitTime && (
                  <Button
                    type="submit"
                    variant="text"
                    onClick={() => openDialog(adminBooking)}
                  >
                    Confirm visit
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmVisitDialog
        loading={loading}
        dialogOpen={dialogOpen}
        closeDialog={closeDialog}
        booking={booking}
        confirmVisitRequest={confirmVisitRequest}
      />
      <Toast snackbarOpen={snackbarOpen} closeSnackbar={closeSnackbar} errors={errors} />
    </>
  );
}
