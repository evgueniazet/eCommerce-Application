import { useState } from 'react';
import { IRegistrationFormData } from '../interfaces/IRegistrationFormData';

interface IValues {
  password?: string;
  country?: string;
}

export const useValidate = () => {
  const [errors, setErrors] = useState<IRegistrationFormData>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

    if (!emailRegex.test(email)) {
      return 'A properly formatted email address is required';
    }

    return '';
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 'Password must contain at least 8 characters';
    }
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      return 'Password must contain at least one lowercase letter, one uppercase letter, and one number';
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
      return 'The field must not contain any special characters';
    }

    return '';
  };

  const validateBirthDate = (birthDate: string) => {
    const minAge = 13;
    const currentDate = new Date();
    const selectedDate = new Date(birthDate);

    const ageDifference = currentDate.getFullYear() - selectedDate.getFullYear();

    if (ageDifference < minAge) {
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
    if (!/^[A-Za-z\s]+$/.test(city)) {
      return 'The field must not contain any special characters';
    }

    return '';
  };

  const validatePostalCode = (postalCode: string, country: string) => {
    if (country === 'USA' || country === 'Canada') {
      if (!/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(postalCode)) {
        return 'Invalid postal code format! Correct format A1B 2C3 for the USA and Canada';
      } else {
        return '';
      }
    } else if (!/^\d{5}$/.test(postalCode)) {
      return 'Invalid postal code format! Correct format: 12345';
    } else {
      return '';
    }
  };

  const validateCountry = (country: string) => {
    if (!/^[A-Za-z\s]+$/.test(country)) {
      return 'Enter a valid country';
    }

    return '';
  };

  const validateField = (fieldName: string, value: string, values?: IValues) => {
    let errorMessage = '';

    switch (fieldName) {
      case 'email':
        errorMessage = validateEmail(value);
        break;
      case 'password':
        errorMessage = validatePassword(value);
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
      case 'postalCode':
        if (values) {
          errorMessage = validatePostalCode(value, values.country || '');
        }
        break;
      case 'country':
        errorMessage = validateCountry(value);
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: errorMessage }));
  };

  return { errors, validateField };
};
