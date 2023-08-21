export const validateConfirmPassword = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }

  return '';
};
