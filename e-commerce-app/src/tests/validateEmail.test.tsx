import { validateEmail } from '../validators/validateEmail';

describe('validateEmail', () => {
  it('should return an error message for an email with spaces', () => {
    const email = 'user@ example.com';
    const errorMessage = validateEmail(email);
    expect(errorMessage).toBe('Email address cannot contain spaces');
  });

  it('should return an error message for an improperly formatted email', () => {
    const email = 'user@example';
    const errorMessage = validateEmail(email);
    expect(errorMessage).toBe(
      'A properly formatted email address is required. E.g.: user@example.com',
    );
  });

  it('should return an empty string for a valid email', () => {
    const email = 'user@example.com';
    const errorMessage = validateEmail(email);
    expect(errorMessage).toBe('');
  });
});
