import { IRegistrationFormData } from './IRegistrationFormData';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { IValues } from './IValues';
import { globalErrors } from '../types';

export interface IUserProps {
  register: UseFormRegister<IRegistrationFormData>;
  validationHandler: (
    fieldName: keyof IRegistrationFormData,
    value: string,
    values?: IValues,
  ) => void;
  errors: globalErrors<IRegistrationFormData>;
  userData: string[];
  setValue: UseFormSetValue<IRegistrationFormData>;
}
