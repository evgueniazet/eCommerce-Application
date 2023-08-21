export const validateCity = (city: string) => {
  if (!/^[A-Za-zА-Яа-я\s]+$/.test(city)) {
    return 'The field must not contain any special characters';
  }

  return '';
};
