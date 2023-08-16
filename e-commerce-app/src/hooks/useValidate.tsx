import { useState } from 'react';

interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  streetAddress?: string;
  country?: string;
  city?: string;
  postalCode?: string;
}

export const useValidate = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

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
    console.log('country', country);

    if (country === 'USA' || country === 'Canada') {
      console.log('нужно ввести код для Канады');

      if (!/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(postalCode)) {
        return 'Invalid postal code format!';
      } else {
        return '';
      }
    } else if (!/^\d{5}$/.test(postalCode)) {
      return 'Invalid postal code format!';
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

  const validateField = (fieldName: string, value: string, password?: string, country?: string) => {
    let errorMessage = '';

    switch (fieldName) {
      case 'email':
        errorMessage = validateEmail(value);
        break;
      case 'password':
        errorMessage = validatePassword(value);
        break;
      case 'confirmPassword':
        errorMessage = validateConfirmPassword(password || '', value);
        break;
      case 'firstName':
      case 'lastName':
        errorMessage = validateName(value);
        break;
      case 'streetAddress':
        errorMessage = validateStreet(value);
        break;
      case 'city':
        errorMessage = validateCity(value);
        break;
      case 'postalCode':
        errorMessage = validatePostalCode(value, country || '');
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
