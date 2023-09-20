import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { HomePage } from '../pages/HomePage/HomePage';

describe('HomePage Component', () => {
  const mockStore = configureStore([]);
  const store = mockStore({
    user: {
      email: 'test@example.com',
    },
  });

  it('should render without errors', () => {
    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <HomePage />
      </Provider>,
    );

    expect(getByText(/Hello, test@example\.com Can I call you a Friend\?/i)).toBeInTheDocument();
    expect(getByText(/Active Promo Codes/i)).toBeInTheDocument();

    const promoCodes = getAllByText(/Coupon Code #[0-9]+/i);
    expect(promoCodes.length).toBeGreaterThan(0);

    const promoCodeNumbers = getAllByText(/XXX-XXX-XX/i);
    expect(promoCodeNumbers.length).toBeGreaterThan(0);
  });
});
