export const validateCountry = (country: string) => {
  if (!/^[A-Za-z\s]+$/.test(country)) {
    return 'Enter a valid country';
  }

  return '';
};
