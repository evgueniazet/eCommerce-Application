import { render, screen, fireEvent } from '@testing-library/react';
import BasketEmpty from '../components/BasketEmpty/BasketEmpty';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('BasketEmpty component', () => {
  test('renders the empty cart message', () => {
    render(
      <MemoryRouter>
        <BasketEmpty />
      </MemoryRouter>,
    );

    const emptyCartMessage = screen.getByText(/Your cart is empty/i);
    expect(emptyCartMessage).toBeInTheDocument();
  });

  test('renders the start shopping button', () => {
    render(
      <MemoryRouter>
        <BasketEmpty />
      </MemoryRouter>,
    );

    const startShoppingButton = screen.getByRole('button', { name: /Start shopping/i });
    expect(startShoppingButton).toBeInTheDocument();
  });

  test('clicking the start shopping button navigates to /products', () => {
    const history = createMemoryHistory();
    render(
      <MemoryRouter>
        <BasketEmpty />
      </MemoryRouter>,
    );

    const startShoppingButton = screen.getByRole('button', { name: /Start shopping/i });
    fireEvent.click(startShoppingButton);

    expect(history.location.pathname).toBe('/');
  });
});
