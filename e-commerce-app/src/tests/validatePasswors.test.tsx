import { validatePassword } from '../validators/validatePassword';

describe('validatePassword', () => {
  it('should return an error message for a password with whitespace characters', () => {
    const password = 'Abc 123!';
    const errorMessage = validatePassword('', password);
    expect(errorMessage).toBe('Password cannot contain whitespace characters');
  });

  it('should return an empty string for a valid password', () => {
    const password = 'Abc123!@';
    const errorMessage = validatePassword('', password);
    expect(errorMessage).toBe('');
  });

  it('should return an error message for non-matching passwords', () => {
    const password = 'Abc123!@';
    const confirmPassword = 'Abc1234!@';
    const errorMessage = validatePassword(confirmPassword, password);
    expect(errorMessage).toBe('Passwords do not match');
  });

  it('should return an empty string for matching passwords', () => {
    const password = 'Abc123!@';
    const confirmPassword = 'Abc123!@';
    const errorMessage = validatePassword(confirmPassword, password);
    expect(errorMessage).toBe('');
  });
});
