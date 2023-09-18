import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { BasketPage } from '../pages/BasketPage/BasketPage';
import { MemoryRouter } from 'react-router-dom';

describe('BasketPage component', () => {
  test('renders BasketFull when there are items in the cart', async () => {
    jest.mock('../api/cartApi', () => ({
      getTotalQuantityLineItemsInCart: jest.fn().mockReturnValue(2),
    }));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BasketPage />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.queryByText(/Shopping cart/)).toBeInTheDocument();
      expect(screen.queryByText(/Loading.../)).toBeNull();
    });
  });

  test('renders BasketEmpty when there are no items in the cart', async () => {
    jest.mock('../api/cartApi', () => ({
      getTotalQuantityLineItemsInCart: jest.fn().mockReturnValue(0),
    }));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BasketPage />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
      expect(screen.queryByText(/Continue shopping/)).toBeNull();
      expect(screen.getByText(/Shopping cart/)).toBeInTheDocument();
    });
  });
});
