import { render } from '@testing-library/react';
import { Footer } from '../components/Footer/Footer';

describe('Footer component', () => {
  test('renders component without errors', () => {
    render(<Footer />);
  });
});
