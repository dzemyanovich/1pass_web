import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

import { signIn } from '../utils/auth';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

// todo: add client validation
// todo: add location for server validation errors
// todo: add loading screen
export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [erorrs, setErrors] = useState([] as string[]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) {
      return;
    }

    setErrors([]);
    const data = new FormData(event.currentTarget);
    const username = data.get('username') as string;
    const password = data.get('password') as string;

    setLoading(true);
    const response = await signIn(username, password);
    if (response.success) {
      window.location.href = getUrlParam('returnUrl') || '/';
    } else {
      setErrors(response.errors);
      setLoading(false);
    }
  };

  // todo: go to browser -> TypeError: Cannot read properties of undefined (reading 'icons')
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              // todo: add client validation
              // error
              // helperText="Required field"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              disabled={loading}
            />
            <Box sx={{ position: 'relative' }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 3 }}
                disabled={loading}
              >
                Sign In
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
            {!!erorrs.length && (
              <Alert severity="error">
                {erorrs.map((error: string, index: number) => <div key={`server-error-${index}`}>{error}</div>)}
              </Alert>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

function getUrlParam(name: string): string {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}
