import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Outlet, BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import SignIn from './pages/sign-in';
import TodayBookings from './pages/today-bookings';
import UnauthenticatedRouteOnly from './components/unauthenticated-route-only';
import ProtectedRoute from './components/protected-route';
import store from './redux/store';
import BookingsWrapper from './pages/bookings-wrapper';
import PastBookings from './pages/past-bookings';

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
                <BookingsWrapper>
                  <TodayBookings />
                </BookingsWrapper>
              </ProtectedRoute>
            )}
          />
          <Route
            path="*"
            element={(
              <ProtectedRoute>
                <BookingsWrapper>
                  <TodayBookings />
                </BookingsWrapper>
              </ProtectedRoute>
            )}
          />
          <Route
            path="/past-bookings"
            element={(
              <ProtectedRoute>
                <BookingsWrapper>
                  <PastBookings />
                </BookingsWrapper>
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
