import { validateCity } from '../validators/validateCity';

describe('validateCity', () => {
  it('should return an error message for a city with special characters', () => {
    const city = 'New York!';
    const errorMessage = validateCity(city);
    expect(errorMessage).toBe('The field must not contain any special characters');
  });

  it('should return an empty string for a valid city with only letters', () => {
    const city = 'London';
    const errorMessage = validateCity(city);
    expect(errorMessage).toBe('');
  });

  it('should return an empty string for a valid city with only letters and spaces', () => {
    const city = 'Los Angeles';
    const errorMessage = validateCity(city);
    expect(errorMessage).toBe('');
  });

  it('should return an empty string for a valid city with letters and non-English characters', () => {
    const city = 'Берлин';
    const errorMessage = validateCity(city);
    expect(errorMessage).toBe('');
  });

  it('should return an empty string for a valid city with leading/trailing spaces', () => {
    const city = '   Sydney   ';
    const errorMessage = validateCity(city);
    expect(errorMessage).toBe('');
  });
});
