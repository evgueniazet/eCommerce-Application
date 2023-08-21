export const validateBirthDate = (birthDate: string) => {
  const minAge = 13;
  const currentDate = new Date();
  const selectedDate = new Date(birthDate);

  const ageDifference = currentDate.getFullYear() - selectedDate.getFullYear();

  const monthDifference = currentDate.getMonth() - selectedDate.getMonth();
  const dayDifference = currentDate.getDate() - selectedDate.getDate();

  if (ageDifference < minAge) {
    return `You must be at least ${minAge} years old to register`;
  }

  if (
    ageDifference === minAge &&
    (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0))
  ) {
    return `You must be at least ${minAge} years old to register`;
  }

  return '';
};
