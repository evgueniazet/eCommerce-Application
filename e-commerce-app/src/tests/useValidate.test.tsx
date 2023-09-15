import { renderHook } from '@testing-library/react';
import { useValidate } from '../hooks/useValidate';

describe('useValidate', () => {
  it('should initialize with default errors object', () => {
    const { result } = renderHook(() => useValidate());

    expect(result.current.errors).toEqual({
      email: null,
      birthDate: null,
      cityShipping: null,
      cityBilling: null,
      countryShipping: null,
      countryBilling: null,
      confirmPassword: null,
      password: null,
      firstName: null,
      lastName: null,
      postalCodeShipping: null,
      postalCodeBilling: null,
      streetAddressBilling: null,
      streetAddressShipping: null,
    });
  });
});
