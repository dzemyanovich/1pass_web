import * as React from 'react';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { getBookings } from '../utils/auth';

type ProtectedRoute = {
  children: React.ReactNode,
};

export default function ProtectedRoute({ children }: ProtectedRoute): JSX.Element {
  // todo: refactor naming
  const [isValidToken, initValidToken] = useState(null);
  const [isLoading, initLoading] = useState(true);

  useEffect(() => {
    async function validateTokenWrapper() {
      const isValidTokenValue = await getBookings();
      initValidToken(isValidTokenValue);
      initLoading(false);
    }

    validateTokenWrapper();
  }, []);

  if (isLoading) {
    return null;
  }

  if (!isValidToken) {
    const to = window.location.pathname === '/'
      ? '/sign-in'
      : `/sign-in?returnUrl=${window.location.pathname}`;
    return <Navigate to={to} replace />;
  }

  return children as JSX.Element;
}
