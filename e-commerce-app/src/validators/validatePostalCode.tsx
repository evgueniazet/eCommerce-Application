export const validatePostalCode = (postalCode: string, country: string) => {
  if (country === 'Canada') {
    if (!/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(postalCode)) {
      return 'Invalid postal code format! Correct format A1B 2C3 for Canada';
    } else {
      return '';
    }
  } else if (country === 'Poland') {
    if (!/^\d{2}-\d{3}$/.test(postalCode)) {
      return 'Invalid postal code format! Correct format: 12-345 for Poland';
    } else {
      return '';
    }
  } else if (country === 'Germany') {
    if (!/^\d{5}$/.test(postalCode)) {
      return 'Invalid postal code format! Correct format: 12345 for Germany';
    } else {
      return '';
    }
  } else {
    return 'Country not supported';
  }
};
