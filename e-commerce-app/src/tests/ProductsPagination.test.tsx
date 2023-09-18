import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductsPagination from '../components/ProductsPagination/ProductsPagination';

describe('ProductsPagination Component', () => {
  const mockStore = configureStore([]);
  const initialState = {
    products: {
      total: 36,
    },
    queryParams: {
      limit: 10,
      offset: 0,
    },
  };
  const store = mockStore(initialState);

  it('should render pagination component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductsPagination />
      </Provider>,
    );
    const paginationElement = getByText('1');
    expect(paginationElement).toBeInTheDocument();
  });

  it('should change page when clicking pagination buttons', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductsPagination />
      </Provider>,
    );

    const secondPageButton = getByText('2');
    fireEvent.click(secondPageButton);

  });
});
