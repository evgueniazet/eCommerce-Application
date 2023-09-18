import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { UserReducer } from '../store/slices/userSlice';
import RootPage from '../pages/RootPage/RootPage';

describe('RootPage Component', () => {
  it('should render Header, Outlet, and Footer', () => {
    const store = configureStore({
      reducer: {
        user: UserReducer,
      },
    });

    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <RootPage />
        </Provider>
      </BrowserRouter>,
    );

    const header = getByTestId('header');
    const footer = getByTestId('footer');

    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });
});
