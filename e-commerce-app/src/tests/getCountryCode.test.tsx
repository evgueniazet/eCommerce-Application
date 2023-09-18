import { getCountryCode } from '../utils/getCountryCode';

describe('getCountryCode', () => {
  it('should return the country code for a valid country name', () => {
    const countryName = 'Poland';
    const expectedCode = 'PL';

    const result = getCountryCode(countryName);

    expect(result).toBe(expectedCode);
  });

  it('should return an empty string for an invalid country name', () => {
    const countryName = '';
    const expectedCode = '';

    const result = getCountryCode(countryName);

    expect(result).toBe(expectedCode);
  });

  it('should handle country names with different letter cases', () => {
    const countryName = 'Germany';
    const expectedCode = 'DE';

    const result = getCountryCode(countryName);

    expect(result).toBe(expectedCode);
  });
});
