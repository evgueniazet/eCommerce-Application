import { validateBirthDate } from '../validators/validateBirthDate';

describe('validateBirthDate', () => {
  it('should return an error message for a birth date that makes the user younger than the minimum age', () => {
    const currentDate = new Date();
    const minAge = 13;
    const year = currentDate.getFullYear() - minAge + 1;
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const birthDate = `${year}-${month + 1}-${day}`;
    const errorMessage = validateBirthDate(birthDate);
    expect(errorMessage).toBe(`You must be at least ${minAge} years old to register`);
  });

  it('should return an empty string for a birth date that makes the user exactly the minimum age', () => {
    const currentDate = new Date();
    const minAge = 13;
    const year = currentDate.getFullYear() - minAge;
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const birthDate = `${year}-${month + 1}-${day}`;
    const errorMessage = validateBirthDate(birthDate);
    expect(errorMessage).toBe('');
  });

  it('should return an empty string for a birth date that makes the user older than the minimum age', () => {
    const currentDate = new Date();
    const minAge = 13;
    const year = currentDate.getFullYear() - minAge - 1;
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const birthDate = `${year}-${month + 1}-${day}`;
    const errorMessage = validateBirthDate(birthDate);
    expect(errorMessage).toBe('');
  });
});
