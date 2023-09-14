import { render, screen } from '@testing-library/react';
import MenuLinks from '../components/MenuLinks/MenuLinks';

const navigationData = {
  Home: '/',
  About: '/about',
};

test('renders MenuLinks with MenuItem and Button elements', () => {
  render(<MenuLinks navigation={navigationData} handler={() => {}} />);

  for (const title of Object.keys(navigationData) as (keyof typeof navigationData)[]) {
    const menuItemElement = screen.getByText(title);
    expect(menuItemElement).toBeInTheDocument();

    const buttonElement = screen.getByText(title);
    expect(buttonElement).toBeInTheDocument();

    const path: string = navigationData[title];
    expect(buttonElement).toHaveAttribute('href', path);
  }
});
