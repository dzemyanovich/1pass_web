import * as React from 'react';
import { useSelector } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { AUTH_TOKEN_VAR } from '../utils/global-vars';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function ButtonAppBar() {
  function signOut() {
    // todo: make proper sign out
    // todo: create localStorage manager
    localStorage.removeItem(AUTH_TOKEN_VAR);
    location.reload();
  }

  // todo: do not use any
  const adminData: AdminData = useSelector((state: any) => state.adminData);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {adminData.sportObject.name} - {adminData.username}
          </Typography>
          <Button color="inherit" onClick={signOut}>Sign out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

// todo: add loading screen
export default function Bookings() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ButtonAppBar />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <BookingsTable />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function BookingsTable() {
  // todo: do not use any
  const bookings: AdminBooking[] = useSelector((state: any) => state.adminData.bookings);

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

function formatDate(date: Date): string | null {
  if (!date) {
    return null;
  }
  return new Date(date.toString()).toLocaleString();
}