import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { getAdminData } from '../utils/api';
import { SET_ADMIN_DATA, SET_LOADING } from '../redux/action-types';
import SplashScreen from './splash-screen';

type ProtectedRoute = {
  children: React.ReactNode,
};

export default function ProtectedRoute({ children }: ProtectedRoute): JSX.Element {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const adminData: AdminDataVM = useSelector((state: ReduxState) => state.adminData);

  useEffect(() => {
    (async () => {
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
  }, [adminData, dispatch]);

  if (loading) {
    return <SplashScreen />;
  }

  if (!authenticated) {
    const to = window.location.pathname === '/'
      ? '/sign-in'
      : `/sign-in?returnUrl=${window.location.pathname}`;
    return <Navigate to={to} replace />;
  }

  return children as JSX.Element;
}
