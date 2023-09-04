import countryData from '../data/countries.json';

export const getCountryCode = (countryName: string): string => {
  const country = countryData.find((c) => c.name === countryName);
  return country ? country.code : '';
};
