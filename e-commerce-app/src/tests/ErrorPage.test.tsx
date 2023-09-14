import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorPage } from '../pages/ErrorPage/ErrorPage';

test('renders ErrorPage with correct content', () => {
  render(
    <BrowserRouter>
      <ErrorPage />
    </BrowserRouter>,
  );

  const errorMessage = screen.getByText('Sorry, the page you’re looking for doesn’t exist.');
  expect(errorMessage).toBeInTheDocument();

  const errorImage = screen.getByAltText('home-icon');
  expect(errorImage).toBeInTheDocument();

  const backButton = screen.getByRole('link', { name: 'Back Home' });
  expect(backButton).toBeInTheDocument();
});