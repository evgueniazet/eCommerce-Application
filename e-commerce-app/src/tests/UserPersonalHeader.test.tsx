import React from 'react';
import { render } from '@testing-library/react';
import UserPersonalHeader from '../components/UserPersonalHeader/UserPersonalHeader';

describe('UserPersonalHeader', () => {
  it('renders the title and icon correctly', () => {
    const title = 'User Profile';
    const icon = <img alt="User Icon" src="/user-icon.png" />;

    const { getByText, getByAltText } = render(<UserPersonalHeader title={title} icon={icon} />);

    const titleElement = getByText('User Profile');
    const iconElement = getByAltText('User Icon');

    expect(titleElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });
});
