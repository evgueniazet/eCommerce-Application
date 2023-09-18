import { render } from '@testing-library/react';
import { EmptyProducts } from '../components/ProductsList/EmptyProducts';

describe('EmptyProducts Component', () => {
  it('should render empty product message and image', () => {
    const { getByText, getByAltText } = render(<EmptyProducts />);

    const emptyMessage = getByText(
      'This is an empty product list. There are no products available!',
    );
    expect(emptyMessage).toBeInTheDocument();

    const emptyImage = getByAltText('home-icon');
    expect(emptyImage).toBeInTheDocument();
  });
});
