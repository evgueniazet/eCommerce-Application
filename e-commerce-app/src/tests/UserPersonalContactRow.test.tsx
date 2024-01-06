import React from 'react';
import { render, screen } from '@testing-library/react';
import UserPersonalContactRow from '../components/UserPersonalContactRow/UserPersonalContactRow';
import { IMyCustomerAddressResponse } from '../types/addressesTypes';

const mockAddress: IMyCustomerAddressResponse = {
  id: '1',
  country: 'PL',
  city: 'Wroclaw',
  streetName: 'Swidnicka',
  postalCode: '10001',
};

describe('UserPersonalContactRow component', () => {
  it('renders the country correctly', () => {
    render(<UserPersonalContactRow address={mockAddress} />);
    const countryElement = screen.getByText(/Country:/i);
    expect(countryElement).toBeInTheDocument();

    const countryValueElement = screen.getByText(/PL/i);
    expect(countryValueElement).toBeInTheDocument();
  });

  it('renders the city correctly', () => {
    render(<UserPersonalContactRow address={mockAddress} />);
    const cityElement = screen.getByText(/City:/i);
    expect(cityElement).toBeInTheDocument();

    const cityValueElement = screen.getByText(/Wroclaw/i);
    expect(cityValueElement).toBeInTheDocument();
  });

  it('renders the street name correctly', () => {
    render(<UserPersonalContactRow address={mockAddress} />);
    const streetNameElement = screen.getByText(/Street Name:/i);
    expect(streetNameElement).toBeInTheDocument();

    const streetNameValueElement = screen.getByText(/Swidnicka/i);
    expect(streetNameValueElement).toBeInTheDocument();
  });

  it('renders the postal code correctly', () => {
    render(<UserPersonalContactRow address={mockAddress} />);
    const postalCodeElement = screen.getByText(/Postal Code:/i);
    expect(postalCodeElement).toBeInTheDocument();

    const postalCodeValueElement = screen.getByText(/10001/i);
    expect(postalCodeValueElement).toBeInTheDocument();
  });
});
