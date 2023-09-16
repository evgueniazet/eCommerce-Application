import React from 'react';
import { render } from '@testing-library/react';
import LoadingProgress from '../components/LoadingProgress/LoadingProgress';

test('renders loading progress component', () => {
  const { getByText, getByTestId } = render(<LoadingProgress />);

  const loadingText = getByText('Loading...');
  const circularProgress = getByTestId('circular-progress');

  expect(loadingText).toBeInTheDocument();

  const styles = window.getComputedStyle(circularProgress);

  expect(styles.getPropertyValue('width')).toBe('200px');
  expect(styles.getPropertyValue('height')).toBe('200px');
  expect(styles.getPropertyValue('stroke-width')).toBe('10');
});
