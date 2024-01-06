import { validateCountry } from '../validators/validateCountry';

describe('validateCountry', () => {
  it('should return an error message for a country with special characters', () => {
    const country = 'United States!';
    const errorMessage = validateCountry(country);
    expect(errorMessage).toBe('Enter a valid country');
  });

  it('should return an empty string for a valid country without special characters', () => {
    const country = 'United States';
    const errorMessage = validateCountry(country);
    expect(errorMessage).toBe('');
  });
});
