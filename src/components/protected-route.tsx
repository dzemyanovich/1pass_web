import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';

import { getAdminData } from '../utils/api';
import { SET_ADMIN_DATA } from '../redux/action-types';

type ProtectedRoute = {
  children: React.ReactNode,
};

export default function ProtectedRoute({ children }: ProtectedRoute): JSX.Element {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const response = await getAdminData();
      setAuthenticated(response.success);
      if (response.success) {
        dispatch({
          type: SET_ADMIN_DATA,
          payload: response.data,
        });
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return null;
  }

  if (!authenticated) {
    const to = window.location.pathname === '/'
      ? '/sign-in'
      : `/sign-in?returnUrl=${window.location.pathname}`;
    return <Navigate to={to} replace />;
  }

  return children as JSX.Element;
}
