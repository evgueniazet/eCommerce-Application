import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { AddressPanel } from '../components/Panel/Panel';

const { getByLabelText } = screen;

describe('AddressPanel', () => {
  it('renders with default values and ADD button', () => {
    const onAddAddress = jest.fn();

    const { getByLabelText, getByRole } = render(
      <AddressPanel mode="add" onAddAddress={onAddAddress} />,
    );

    expect(getByLabelText('Address name')).toBeInTheDocument();
    expect(getByLabelText('street')).toBeInTheDocument();
    expect(getByLabelText('city')).toBeInTheDocument();
    expect(getByLabelText('country')).toBeInTheDocument();
    expect(getByLabelText('postcode')).toBeInTheDocument();
    expect(getByRole('button', { name: 'ADD' })).toBeInTheDocument();
  });

  it('calls onAddAddress when ADD button is clicked', () => {
    const onAddAddress = jest.fn();
    const { getByRole } = render(<AddressPanel mode="add" onAddAddress={onAddAddress} />);

    const addButton = getByRole('button', { name: 'ADD' });

    fireEvent.change(getByLabelText('Address name'), { target: { value: 'Test Address' } });
    fireEvent.change(getByLabelText('street'), { target: { value: '123 Test St' } });
    fireEvent.change(getByLabelText('city'), { target: { value: 'Test City' } });
    fireEvent.change(getByLabelText('country'), { target: { value: 'Test Country' } });
    fireEvent.change(getByLabelText('postcode'), { target: { value: '12345' } });

    fireEvent.click(addButton);

    expect(onAddAddress).toHaveBeenCalledWith({
      name: 'Test Address',
      street: '123 Test St',
      city: 'Test City',
      country: 'Test Country',
      postcode: '12345',
    });
  });
});
