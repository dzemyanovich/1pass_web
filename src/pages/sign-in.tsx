import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import LoadingButton from '../components/loading-button';
import { signIn } from '../utils/api';
import { requiredError } from '../utils/errors';
import { isEmptyString } from '../utils/validation';
import { SET_ADMIN_DATA } from '../redux/action-types';

export default function SignIn() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erorrs, setErrors] = useState([] as string[]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  function formValid() {
    return !isEmptyString(username) && !isEmptyString(password);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setSubmitted(true);
    event.preventDefault();
    if (loading || !formValid()) {
      return;
    }

    setErrors([]);
    setLoading(true);
    const response = await signIn(username, password);
    if (response.success) {
      dispatch({
        type: SET_ADMIN_DATA,
        payload: response.data.adminData,
      });
      window.location.href = getUrlParam('returnUrl') || '/';
    } else {
      setErrors(response.errors);
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
            error={submitted && isEmptyString(username)}
            helperText={submitted && isEmptyString(username) ? requiredError : ''}
            onChange={event => setUsername(event.target.value)}
            value={username}
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
            error={submitted && isEmptyString(password)}
            helperText={submitted && isEmptyString(password) ? requiredError : ''}
            onChange={event => setPassword(event.target.value)}
            value={password}
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
          <LoadingButton loading={loading}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
              disabled={loading}
            >
              Sign In
            </Button>
          </LoadingButton>
          {!!erorrs.length && (
            <Alert severity="error">
              {erorrs.map((error: string, index: number) => <div key={`server-error-${index}`}>{error}</div>)}
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
}

function getUrlParam(name: string): string {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}
