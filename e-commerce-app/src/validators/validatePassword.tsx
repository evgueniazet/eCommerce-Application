export const validatePassword = (confirmPassword: string, password: string) => {
  const trimmedPassword = password.trim();
  const minLength = 8;
  const specialCharacterRegex = /[!@#$%^&*]/;

  if (trimmedPassword.length < minLength) {
    return 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character (e.g., !@#$%^&*)';
  }

  const hasLowercase = /[a-z]/.test(trimmedPassword);
  const hasUppercase = /[A-Z]/.test(trimmedPassword);
  const hasDigit = /[0-9]/.test(trimmedPassword);
  const hasSpecialCharacter = specialCharacterRegex.test(trimmedPassword);
  const hasWhitespace = /\s/.test(password);

  if (hasWhitespace) {
    return 'Password cannot contain whitespace characters';
  }

  if (!(hasLowercase && hasUppercase && hasDigit) || !hasSpecialCharacter) {
    return 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (e.g., !@#$%^&*)';
  }

  if (confirmPassword && confirmPassword !== password) {
    return 'Passwords do not match';
  }

  return '';
};

export const validateStrictPassword = (password: string) => {
  const trimmedPassword = password.trim();
  const minLength = 8;
  const specialCharacterRegex = /[!@#$%^&*]/;

  if (trimmedPassword.length < minLength) {
    return 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character (e.g., !@#$%^&*)';
  }

  const hasLowercase = /[a-z]/.test(trimmedPassword);
  const hasUppercase = /[A-Z]/.test(trimmedPassword);
  const hasDigit = /[0-9]/.test(trimmedPassword);
  const hasSpecialCharacter = specialCharacterRegex.test(trimmedPassword);
  const hasWhitespace = /\s/.test(password);

  if (hasWhitespace) {
    return 'Password cannot contain whitespace characters';
  }

  if (!(hasLowercase && hasUppercase && hasDigit) || !hasSpecialCharacter) {
    return 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (e.g., !@#$%^&*)';
  }

  return '';
};
