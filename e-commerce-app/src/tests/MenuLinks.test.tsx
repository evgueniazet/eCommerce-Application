import { render, fireEvent } from '@testing-library/react';
import MenuLinks from '../components/MenuLinks/MenuLinks';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('MenuLinks', () => {
  it('calls the navigate function when a link is clicked', () => {
    const navigate = jest.fn();

    const navigation = {
      Home: '/',
      About: '/about',
    };

    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

    const { getByText } = render(<MenuLinks navigation={navigation} handler={() => {}} />);

    fireEvent.click(getByText('Home'));

    expect(navigate).toHaveBeenCalledWith('/');

    fireEvent.click(getByText('About'));

    expect(navigate).toHaveBeenCalledWith('/about');
  });
});
