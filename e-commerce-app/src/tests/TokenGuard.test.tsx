import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TokenGuard from '../requestsComponents/TokenGuard/TokenGuard';
import { UserReducer } from '../store/slices/userSlice';

test('renders LoadingProgress when access token is not available', () => {
  const mockStore = configureStore({
    reducer: {
      user: UserReducer,
    },
    preloadedState: {
      user: {
        email: null,
        password: null,
        access_token: null,
        refresh_token: null,
        isLoggedIn: false,
        rememberMe: false,
      },
    },
  });

  const { getByTestId } = render(
    <Provider store={mockStore}>
      <TokenGuard />
    </Provider>,
  );

  const loadingProgressElement = getByTestId('circular-progress');
  expect(loadingProgressElement).toBeInTheDocument();
});

test('renders Outlet when access token is available', () => {
  const mockStore = configureStore({
    reducer: {
      user: UserReducer,
    },
    preloadedState: {
      user: {
        email: null,
        password: null,
        access_token: 'yourAccessTokenValue',
        refresh_token: null,
        isLoggedIn: false,
        rememberMe: false,
      },
    },
  });

  const { queryByTestId } = render(
    <Provider store={mockStore}>
      <TokenGuard />
    </Provider>,
  );

  const loadingProgressElement = queryByTestId('circular-progress');
  expect(loadingProgressElement).not.toBeInTheDocument();
});
