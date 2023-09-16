import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LogoutPage } from '../pages/LogoutPage/LogoutPage';
import { Provider } from 'react-redux';
import { store } from '../store/store';

test('LogoutPage component renders without errors', async () => {
  const { container } = render(
    <Provider store={store}>
      <MemoryRouter>
        <LogoutPage />
      </MemoryRouter>
    </Provider>,
  );

  await waitFor(() => {
    expect(container.querySelector('.MuiCircularProgress-root')).toBeInTheDocument();
  });
});
