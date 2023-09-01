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
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { TransitionProps } from '@mui/material/transitions';

import LoadingButton from '../components/loading-button';
import { formatDate } from '../utils/format';
import { isToday } from '../utils/utils';
import { confirmVisit } from '../utils/api';
import { SET_VISIT_TIME } from '../redux/action-types';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// todo: chrome -> console -> Selector unknown returned a different result when called with the same parameters.
// This can lead to unnecessary rerenders.
// todo: the same error for past-bookings
export default function TodayBookings() {
  const [dialogOpen, setDiagloOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [booking, setBooking] = useState(null as AdminBooking);
  const [errors, setErrors] = useState([] as string[]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const bookings: AdminBooking[] = useSelector((state: ReduxState) => state
    .adminData
    .bookings
    .filter((booking: AdminBooking) => isToday(booking.bookingTime)));

  const openDialog = (booking: AdminBooking) => {
    setBooking(booking);
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

  const confirmVisitRequest = async (event): Promise<void> => {
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

  const Toast = () => {
    return (
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity={errors.length ? 'error' : 'success'} sx={{ width: '100%' }}>
          {errors.length ? (
            errors.map((error: string) => <div>{error}</div>)
          ) : (
            'Booking updated'
          )}
        </Alert>
      </Snackbar>
    );
  }

  const ConfirmDialog = () => {
    return (
      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Confirm Visit'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {booking && (
              <span>
                Do you wish to confirm visit of <strong>{booking.user.firstName} {booking.user.lastName}</strong>,
                phone <strong>{booking.user.phone}</strong>?
              </span>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} disabled={loading}>Cancel</Button>
          <LoadingButton loading={loading}>
            <Button variant="contained" onClick={confirmVisitRequest} disabled={loading}>Confirm</Button>
          </LoadingButton>
        </DialogActions>
      </Dialog >
    );
  }

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
          {bookings.length === 0 && (
            <TableRow>
              <TableCell colSpan={7}>No bookings found</TableCell>
            </TableRow>
          )}
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
                    onClick={() => openDialog(booking)}
                  >
                    Confirm visit
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmDialog />
      <Toast />
    </React.Fragment>
  );
}
