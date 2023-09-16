import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { UserPassword } from '../pages/UserPage/UserPassword';

const mockStore = configureMockStore();
const store = mockStore({});

describe('UserPassword', () => {
  test('renders UserPassword component', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <UserPassword
          register={jest.fn()}
          validationHandler={jest.fn()}
          errors={{}}
          setValue={jest.fn()}
          password=""
          getValues={jest.fn()}
        />
      </Provider>,
    );

    expect(getByLabelText('Current password')).toBeInTheDocument();
    expect(getByLabelText('New password')).toBeInTheDocument();
    expect(getByLabelText('Confirm new password')).toBeInTheDocument();
  });
});
