import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NavLinks from '../components/NavLinks/NavLinks';
import { MemoryRouter } from 'react-router-dom';

describe('NavLinks', () => {
  it('navigates to the correct path when a button is clicked', () => {
    const { getByText } = render(
      <MemoryRouter>
        <NavLinks />
      </MemoryRouter>
    );

    const homeButton = getByText(/home/i);

    fireEvent.click(homeButton);
  });
});
