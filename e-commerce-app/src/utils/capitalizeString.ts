export const capitalizeString = (str: string): string =>
  str && typeof str === 'string' ? str[0].toUpperCase() + str.slice(1).toLowerCase() : str;
