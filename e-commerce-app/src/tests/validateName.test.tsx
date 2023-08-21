import { validateName } from '../validators/validateName';

describe('validateName', () => {
  it('should return an error message for a name with special characters', () => {
    const name = 'John@Doe';
    const errorMessage = validateName(name);
    expect(errorMessage).toBe('The field must not contain any special characters or numbers');
  });

  it('should return an error message for a name with numbers', () => {
    const name = 'John123';
    const errorMessage = validateName(name);
    expect(errorMessage).toBe('The field must not contain any special characters or numbers');
  });

  it('should return an empty string for a valid name with only letters', () => {
    const name = 'John Doe';
    const errorMessage = validateName(name);
    expect(errorMessage).toBe('');
  });

  it('should return an empty string for a valid name with only letters and spaces', () => {
    const name = 'Jane Smith';
    const errorMessage = validateName(name);
    expect(errorMessage).toBe('');
  });

  it('should return an empty string for a valid name with leading/trailing spaces', () => {
    const name = '   James Brown   ';
    const errorMessage = validateName(name);
    expect(errorMessage).toBe('');
  });
});
