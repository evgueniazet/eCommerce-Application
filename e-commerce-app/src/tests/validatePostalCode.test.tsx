import { validatePostalCode } from '../validators/validatePostalCode';

describe('validatePostalCode', () => {
  it('should return an error message for an invalid postal code format in Canada', () => {
    const postalCode = 'A1B2C3';
    const country = 'Canada';
    const errorMessage = validatePostalCode(postalCode, country);
    expect(errorMessage).toBe('Invalid postal code format! Correct format A1B 2C3 for Canada');
  });

  it('should return an empty string for a valid postal code format in Canada', () => {
    const postalCode = 'A1B 2C3';
    const country = 'Canada';
    const errorMessage = validatePostalCode(postalCode, country);
    expect(errorMessage).toBe('');
  });

  it('should return an error message for an invalid postal code format in Poland', () => {
    const postalCode = '12345';
    const country = 'Poland';
    const errorMessage = validatePostalCode(postalCode, country);
    expect(errorMessage).toBe('Invalid postal code format! Correct format: 12-345 for Poland');
  });

  it('should return an empty string for a valid postal code format in Poland', () => {
    const postalCode = '12-345';
    const country = 'Poland';
    const errorMessage = validatePostalCode(postalCode, country);
    expect(errorMessage).toBe('');
  });

  it('should return an error message for an invalid postal code format in Germany', () => {
    const postalCode = '123456';
    const country = 'Germany';
    const errorMessage = validatePostalCode(postalCode, country);
    expect(errorMessage).toBe('Invalid postal code format! Correct format: 12345 for Germany');
  });

  it('should return an empty string for a valid postal code format in Germany', () => {
    const postalCode = '12345';
    const country = 'Germany';
    const errorMessage = validatePostalCode(postalCode, country);
    expect(errorMessage).toBe('');
  });

  it('should return an error message for an unsupported country', () => {
    const postalCode = '12345';
    const country = 'France';
    const errorMessage = validatePostalCode(postalCode, country);
    expect(errorMessage).toBe('Country not supported');
  });
});
