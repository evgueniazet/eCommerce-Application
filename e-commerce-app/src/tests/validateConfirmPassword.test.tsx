import { validateConfirmPassword } from '../validators/validateConfirmPassword';

describe('validateConfirmPassword', () => {
  it('should return an error message for non-matching passwords', () => {
    const password = 'Abc123!@';
    const confirmPassword = 'Abc1234!@';
    const errorMessage = validateConfirmPassword(password, confirmPassword);
    expect(errorMessage).toBe('Passwords do not match');
  });

  it('should return an empty string for matching passwords', () => {
    const password = 'Abc123!@';
    const confirmPassword = 'Abc123!@';
    const errorMessage = validateConfirmPassword(password, confirmPassword);
    expect(errorMessage).toBe('');
  });
});
