import { IRegistrationFormData } from './IRegistrationFormData';
import { UseFormRegister } from 'react-hook-form';
import { globalErrors } from '../types';
import { IValues } from './IValues';
import { Dispatch, SetStateAction } from 'react';

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
  shippingFlag?: boolean;
  billingFlag?: boolean;
  setShippingFlag?: Dispatch<SetStateAction<boolean>>;
  setBillingFlag?: Dispatch<SetStateAction<boolean>>;
  checkDefault?: boolean;
  setCheckDefault?: Dispatch<SetStateAction<boolean>>;
}
