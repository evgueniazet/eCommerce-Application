import { validateCity, validateStrictCity } from '../validators/validateCity'; // Замените на путь к вашему модулю с функциями валидации

describe('validateCity function', () => {
  it('should return an empty string for a valid city', () => {
    const validCity = 'New York';
    const result = validateCity(validCity);
    expect(result).toBe('');
  });
});

describe('validateStrictCity function', () => {
  it('should return an error message for an empty city', () => {
    const emptyCity = '';
    const result = validateStrictCity(emptyCity);
    expect(result).toBe('The field must contain any characters');
  });

  it('should return an error message for a city with digits', () => {
    const cityWithDigits = 'Miami123';
    const result = validateStrictCity(cityWithDigits);
    expect(result).toBe('The field must not contain any digits');
  });

  it('should return an empty string for a valid city', () => {
    const validCity = 'Seattle';
    const result = validateStrictCity(validCity);
    expect(result).toBe('');
  });
});
