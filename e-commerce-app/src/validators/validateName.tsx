export const validateName = (name: string) => {
  if (!/^[A-Za-z\s]+$/.test(name)) {
    return 'The field must not contain any special characters or numbers';
  }

  return '';
};
