import { render, fireEvent } from '@testing-library/react';
import { AddressItem } from '../components/AddressItem/AddressItem';

describe('AddressItem', () => {
  const address = {
    id: 1,
    name: 'Test Address',
    checked: false,
    street: 'Test Street',
    city: 'Test City',
    country: 'Test Country',
    postcode: '12345',
  };

  const addressData = {
    streetName: 'Test Street',
    city: 'Test City',
    country: 'Test Country',
    postalCode: '12345',
  };

  it('renders address details correctly', () => {
    const { getByText } = render(
      <AddressItem
        todo={address}
        onDeleteAddr={() => {}}
        onCheckAddr={() => {}}
        onEdit={() => {}}
        address={addressData}
      />,
    );

    expect(getByText('Test Address')).toBeInTheDocument();
    expect(getByText('Test Street, Test City, Test Country, 12345')).toBeInTheDocument();
  });

  it('calls onDeleteAddr when delete button is clicked', () => {
    const onDeleteAddr = jest.fn();

    const { getByLabelText } = render(
      <AddressItem
        todo={address}
        onDeleteAddr={onDeleteAddr}
        onCheckAddr={() => {}}
        onEdit={() => {}}
        address={addressData}
      />,
    );

    fireEvent.click(getByLabelText('delete'));

    expect(onDeleteAddr).toHaveBeenCalledWith(1);
  });

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();

    const { getByLabelText } = render(
      <AddressItem
        todo={address}
        onDeleteAddr={() => {}}
        onCheckAddr={() => {}}
        onEdit={onEdit}
        address={addressData}
      />,
    );

    fireEvent.click(getByLabelText('edit'));

    expect(onEdit).toHaveBeenCalledWith(1);
  });

  it('calls onCheckAddr when the address name is clicked', () => {
    const onCheckAddr = jest.fn();

    const { getByText } = render(
      <AddressItem
        todo={address}
        onDeleteAddr={() => {}}
        onCheckAddr={onCheckAddr}
        onEdit={() => {}}
        address={addressData}
      />,
    );

    fireEvent.click(getByText('Test Address'));

    expect(onCheckAddr).toHaveBeenCalledWith(1);
  });
});
