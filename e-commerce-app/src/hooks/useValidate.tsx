import { useState } from 'react';
import { IRegistrationFormData } from '../interfaces/IRegistrationFormData';
import { IValues } from '../interfaces/IValues';
import { validateEmail } from '../validators/validateEmail';
import { validatePassword } from '../validators/validatePassword';
import { validateConfirmPassword } from '../validators/validateConfirmPassword';
import { validateBirthDate } from '../validators/validateBirthDate';
import { validateStreet } from '../validators/validateStreet';
import { validateCity } from '../validators/validateCity';
import { validatePostalCode } from '../validators/validatePostalCode';
import { validateCountry } from '../validators/validateCountry';
import { validateName } from '../validators/validateName';

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
