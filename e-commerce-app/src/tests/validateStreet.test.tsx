import { validateStreet } from '../validators/validateStreet';

describe('validateStreet', () => {
  it('should return an error message for an empty street value', () => {
    const street = '';
    const errorMessage = validateStreet(street);
    expect(errorMessage).toBe('The street field must contain at least one character');
  });

  it('should return an empty string for a non-empty street value', () => {
    const street = '123 Main Street';
    const errorMessage = validateStreet(street);
    expect(errorMessage).toBe('');
  });

  it('should return an empty string for a non-empty street value with leading/trailing spaces', () => {
    const street = '   456 Elm Avenue   ';
    const errorMessage = validateStreet(street);
    expect(errorMessage).toBe('');
  });
});
