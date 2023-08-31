import * as React from 'react';
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { getAdminData } from '../utils/api';
import { SET_ADMIN_DATA, SET_LOADING } from '../redux/action-types';

type ProtectedRoute = {
  children: React.ReactNode,
};

export default function ProtectedRoute({ children }: ProtectedRoute): JSX.Element {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const adminData: AdminData = useSelector((state: ReduxState) => state.adminData);

  useEffect(() => {
    (async function () {
      if (adminData) {
        setAuthenticated(true);
      } else {
        const response = await getAdminData();
        setAuthenticated(response.success);
        if (response.success) {
          dispatch({
            type: SET_ADMIN_DATA,
            payload: response.data,
          });
        }
      }
      setLoading(false);
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
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
