import { IRegistrationFormData } from './IRegistrationFormData';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { IValues } from './IValues';
import { globalErrors } from '../types';
import { IMyCustomerApiAddressRequest } from '../types/addressesTypes';

export interface IUserProps {
  register: UseFormRegister<IRegistrationFormData>;
  validationHandler: (
    fieldName: keyof IRegistrationFormData,
    value: string,
    values?: IValues,
  ) => void;
  errors: globalErrors<IRegistrationFormData>;
  userData?: string[];
  userAddresses?: (IMyCustomerApiAddressRequest[] | string[] | string | undefined)[];
  setValue: UseFormSetValue<IRegistrationFormData>;
  password?: string;
  getValues?: (fieldName: string) => string | undefined;
}
