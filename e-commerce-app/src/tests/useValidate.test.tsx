import { renderHook, act } from '@testing-library/react-hooks';
import { useValidate } from '../hooks/useValidate';

describe('useValidate', () => {
  it('should initialize with default errors object', () => {
    const { result } = renderHook(() => useValidate());

    expect(result.current.errors).toEqual({
      email: null,
      birthDate: null,
      city: null,
      country: null,
      confirmPassword: null,
      password: null,
      firstName: null,
      lastName: null,
      postalCode: null,
      streetAddress: null,
    });
  });
});
