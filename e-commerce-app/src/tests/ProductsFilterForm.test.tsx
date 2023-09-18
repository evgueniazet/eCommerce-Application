import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ProductsFilterForm from '../components/ProductsFilterForm/ProductsFilterForm';

describe('ProductsFilterForm', () => {
  it('should render without errors', () => {
    const { container } = render(
      <Provider store={store}>
        <ProductsFilterForm />
      </Provider>,
    );
    expect(container).toBeInTheDocument();
  });
});
