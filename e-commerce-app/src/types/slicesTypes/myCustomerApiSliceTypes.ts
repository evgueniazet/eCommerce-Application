import { IAnonymousCartSignIn } from '../customerCartTypes';
import { IMyCustomerApiAddressRequest } from '../addressesTypes';

export interface IMyCustomerLoginRequest {
  email: string;
  password: string;
  anonymousCart?: IAnonymousCartSignIn;
}

export interface IMyCustomerBaseResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  addresses: IMyCustomerApiAddressRequest[];
  billingAddressIds: string[];
  shippingAddressIds: string[];
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
  isEmailVerified: boolean;
  authenticationMode: 'Password' | string;
}

export interface IMyCustomerApiSignupRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
  addresses: IMyCustomerApiAddressRequest[];
  shippingAddresses: number[];
  billingAddresses: number[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export interface ISignUpMyCustomer {
  token: string;
  customerData: IMyCustomerApiSignupRequest;
}
