import * as React from 'react';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function Toast({ snackbarOpen, closeSnackbar, errors }: ToastProps) {
  return (
    <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={closeSnackbar}>
      <Alert onClose={closeSnackbar} severity={errors.length ? 'error' : 'success'} sx={{ width: '100%' }}>
        {errors.length ? (
          errors.map((error: string, index: number) => <div key={`error-${index.toString()}`}>{error}</div>)
        ) : (
          'Booking updated'
        )}
      </Alert>
    </Snackbar>
  );
}
