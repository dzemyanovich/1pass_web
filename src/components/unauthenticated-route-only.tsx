import * as React from 'react';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { getAdminData } from '../utils/api';
import SplashScreen from './splash-screen';

type UnauthenticatedRouteOnly = {
  children: React.ReactNode,
};

export default function UnauthenticatedRouteOnly({ children }: UnauthenticatedRouteOnly): JSX.Element {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getAdminData();
      setAuthenticated(response.success);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  if (authenticated) {
    return <Navigate to="/" replace />;
  }

  return children as JSX.Element;
}
