import { useState } from 'react';
import { IRegistrationFormData } from '../interfaces/IRegistrationFormData';
import { IValues } from '../interfaces/IValues';

const defaultErrorsObj: IRegistrationFormData = {
  email: null,
  birthDate: null,
  cityShipping: null,
  cityBilling: null,
  countryShipping: null,
  countryBilling: null,
  confirmPassword: null,
  password: null,
  firstName: null,
  lastName: null,
  postalCodeShipping: null,
  postalCodeBilling: null,
  streetAddressBilling: null,
  streetAddressShipping: null,
};

export const useValidate = () => {
  const [errors, setErrors] = useState<IRegistrationFormData>(defaultErrorsObj);

  const validateEmail = (email: string) => {
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

  const validatePassword = (confirmPassword: string, password: string) => {
    const trimmedPassword = password.trim();
    const minLength = 8;
    const specialCharacterRegex = /[!@#$%^&*]/;

    if (trimmedPassword.length < minLength) {
      return 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character (e.g., !@#$%^&*)';
    }

    const hasLowercase = /[a-z]/.test(trimmedPassword);
    const hasUppercase = /[A-Z]/.test(trimmedPassword);
    const hasDigit = /[0-9]/.test(trimmedPassword);
    const hasSpecialCharacter = specialCharacterRegex.test(trimmedPassword);
    const hasWhitespace = /\s/.test(password);

    if (hasWhitespace) {
      return 'Password cannot contain whitespace characters';
    }

    if (!(hasLowercase && hasUppercase && hasDigit) || !hasSpecialCharacter) {
      return 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (e.g., !@#$%^&*)';
    }

    if (confirmPassword && confirmPassword !== password) {
      return 'Passwords do not match';
    }

    return '';
  };

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }

    return '';
  };

  const validateName = (name: string) => {
    if (!/^[A-Za-z\s]+$/.test(name)) {
      return 'The field must not contain any special characters or numbers';
    }

    return '';
  };

  const validateBirthDate = (birthDate: string) => {
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

  const validateStreet = (value: string) => {
    if (value.trim() === '') {
      return 'The street field must contain at least one character';
    }
    return '';
  };

  const validateCity = (city: string) => {
    if (!/^[A-Za-zА-Яа-я\s]+$/.test(city)) {
      return 'The field must not contain any special characters';
    }

    return '';
  };

  const validatePostalCode = (postalCode: string, country: string) => {
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

  const validateCountry = (country: string) => {
    if (!/^[A-Za-z\s]+$/.test(country)) {
      return 'Enter a valid country';
    }

    return '';
  };

  const validateField = (fieldName: string, value: string, values?: IValues): string => {
    let errorMessage = '';

    switch (fieldName) {
      case 'email':
        errorMessage = validateEmail(value);
        break;
      case 'password':
        errorMessage = validatePassword(values?.confirmPassword || '', value);
        break;
      case 'confirmPassword':
        if (values) {
          errorMessage = validateConfirmPassword(values.password || '', value);
        }
        break;
      case 'firstName':
      case 'lastName':
        errorMessage = validateName(value);
        break;
      case 'birthDate':
        errorMessage = validateBirthDate(value);
        break;
      case 'streetAddress':
        errorMessage = validateStreet(value);
        break;
      case 'city':
        errorMessage = validateCity(value);
        break;
      case 'postalCodeShipping':
        if (values) {
          errorMessage = validatePostalCode(value, values.countryShipping || '');
        }
        break;
      case 'postalCodeBilling':
        if (values) {
          errorMessage = validatePostalCode(value, values.countryBilling || '');
        }
        break;
      case 'country':
        errorMessage = validateCountry(value);
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: errorMessage || null }));
    return errorMessage;
  };

  return { errors, validateField };
};
