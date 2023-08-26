import * as React from 'react';
import { useSelector } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { AUTH_TOKEN_VAR } from '../utils/global-vars';
import Loading from '../components/loading';

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
export default function BookingsWrapper({ children }) {
  const loading: boolean = useSelector((state: any) => state.loading);
  if (loading) {
    return <Loading />
  }

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
                  {children}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
