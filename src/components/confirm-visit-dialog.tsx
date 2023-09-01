import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions/transition';

import LoadingButton from './loading-button';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ConfirmVisitDialog({ loading, dialogOpen, closeDialog, booking, confirmVisitRequest }) {
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
  )
}

export default React.memo(ConfirmVisitDialog);
