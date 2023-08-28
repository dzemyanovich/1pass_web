import * as React from 'react';
import { useSelector } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Loading from '../components/loading';
import BottomBar from '../components/bottom-bar';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function BookingsWrapper({ children }) {
  const loading: boolean = useSelector((state: any) => state.loading);
  if (loading) {
    return <Loading />
  }

  return (
    // todo: do we need ThemeProvider?
    <ThemeProvider theme={defaultTheme}>
      <BottomBar />
      <Box sx={{ display: 'flex' }}>
        {/* todo: do we need CssBaseline */}
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
