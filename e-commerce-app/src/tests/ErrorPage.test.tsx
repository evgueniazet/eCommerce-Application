import React from 'react';
import { render } from '@testing-library/react';
import { ErrorPage } from '../pages/ErrorPage/ErrorPage';

jest.mock('react-router-dom', () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));
test('renders ErrorPage component', () => {
  const { getByText } = render(<ErrorPage />);

  const textElement = getByText(/Sorry, the page you’re looking for doesn’t exist./i);
  expect(textElement).toBeInTheDocument();
});
