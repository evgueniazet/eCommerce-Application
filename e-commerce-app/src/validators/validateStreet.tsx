export const validateStreet = (value: string) => {
  if (value.trim() === '') {
    return 'The street field must contain at least one character';
  }
  return '';
};