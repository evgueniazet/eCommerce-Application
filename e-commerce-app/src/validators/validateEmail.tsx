export const validateEmail = (email: string) => {
  const noSpacesEmail = email.replace(/\s/g, '');

  if (noSpacesEmail !== email) {
    return 'Email address cannot contain spaces';
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

  if (!emailRegex.test(email)) {
    return 'A properly formatted email address is required. E.g.: user@example.com';
  }

  return '';
};
