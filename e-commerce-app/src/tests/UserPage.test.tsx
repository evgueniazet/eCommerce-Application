import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { UserPage } from '../pages/UserPage/UserPage';
import { store } from '../store/store';

describe('UserPage', () => {
  test('renders UserPage component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <UserPage />
      </Provider>,
    );

    expect(getByText('Profile Page 1')).toBeInTheDocument();
  });
});
