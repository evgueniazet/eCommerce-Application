import { Provider } from 'react-redux';
import { store } from '../store/store';
import { AboutPage } from '../pages/AboutPage/AboutPage';
import { render, screen } from '@testing-library/react';

describe('AboutPage component', () => {
  test('renders component without errors', () => {
    render(
      <Provider store={store}>
        <AboutPage />
      </Provider>,
    );

    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(
      screen.getByText("We're on a mission to complete eCommerce Application successfully."),
    ).toBeInTheDocument();

    const githubLinks = screen.getAllByRole('link');
    githubLinks.forEach((link) => {
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href');
      expect(link).toHaveAttribute('target', '_blank');
    });
  });
});
