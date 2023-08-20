import { IRegistrationFormData } from './IRegistrationFormData';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { IValues } from './IValues';

export interface IFormPageProps {
  isActive: boolean;
  register: UseFormRegister<IRegistrationFormData>;
  errors: FieldErrors<IRegistrationFormData>;
  validationHandler: (
    fieldName: keyof IRegistrationFormData,
    value: string,
    values?: IValues,
  ) => void;
  getValues?: (fieldName: string) => string;
  values?: IValues;
}
