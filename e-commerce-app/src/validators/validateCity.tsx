export const validateCity = (city: string) => {
  if (!/^[A-Za-zА-Яа-я\s]+$/.test(city)) {
    return 'The field must not contain any special characters';
  }

  return '';
};

export const validateStrictCity = (city: string) => {
  if (city.length === 0) {
    return 'The field must contain any characters';
  }

  const specialCharacterRegex = /[!@#%^&*()_+\-=[\]{}|;':",./<>?~`]/;
  const hasDigit = /[0-9]/.test(city);
  const hasSpecialCharacter = specialCharacterRegex.test(city);

  if (hasSpecialCharacter) {
    return 'The field must not contain any special characters';
  }

  if (hasDigit) {
    return 'The field must not contain any digits';
  }

  return '';
};
