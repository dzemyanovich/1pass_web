import * as React from 'react';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { getBookings } from '../utils/api';

type UnauthenticatedRouteOnly = {
  children: React.ReactNode,
};

export default function UnauthenticatedRouteOnly({ children }: UnauthenticatedRouteOnly): JSX.Element {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const response = await getBookings();
      setAuthenticated(response.success);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return null;
  }

  if (authenticated) {
    return <Navigate to="/" replace />;
  }

  return children as JSX.Element;
}
