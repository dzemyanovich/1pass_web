import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Outlet, BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import SignIn from './pages/sign-in';
import Bookings from './pages/bookings';
import UnauthenticatedRouteOnly from './components/unauthenticated-route-only';
import ProtectedRoute from './components/protected-route';
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route
            index
            element={(
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            )}
          />
          <Route
            path="*"
            element={(
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/sign-in"
            element={(
              <UnauthenticatedRouteOnly>
                <SignIn />
              </UnauthenticatedRouteOnly>
            )}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
);
