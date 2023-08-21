import { IRegistrationFormData } from './IRegistrationFormData';
import { UseFormRegister } from 'react-hook-form';
import { globalErrors } from '../types';
import { IValues } from './IValues';

export interface IFormPageProps {
  isActive: boolean;
  register: UseFormRegister<IRegistrationFormData>;
  errors: globalErrors<IRegistrationFormData>;
  validationHandler: (
    fieldName: keyof IRegistrationFormData,
    value: string,
    values?: IValues,
  ) => void;
  getValues?: (fieldName: string) => string;
  values?: IValues;
}
