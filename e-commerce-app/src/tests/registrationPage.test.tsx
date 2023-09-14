import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';
import { UserReducer } from '../store/slices/userSlice';

test('renders RegistrationPage with form', () => {
  const store = configureStore({
    reducer: {
      user: UserReducer,
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    </Provider>,
  );

  const pageTitle = screen.getByText('Welcome to Registration!');
  expect(pageTitle).toBeInTheDocument();

  const signUpButton = screen.getByRole('button', { name: 'Sign Up' });
  expect(signUpButton).toBeInTheDocument();

  const loginLink = screen.getByText('Already have an account? Login');
  expect(loginLink).toBeInTheDocument();

  fireEvent.click(signUpButton);
});
