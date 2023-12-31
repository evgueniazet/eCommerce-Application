import { IAnonymousCartSignIn } from '../customerCartTypes';
import { IMyCustomerAddressResponse, IMyCustomerApiAddressRequest } from '../addressesTypes';

export interface IMyCustomerLoginRequest {
  email: string;
  password: string;
  anonymousCart?: IAnonymousCartSignIn;
}

export interface IAuthenticateMyCustomer {
  token: string;
  customerData: IMyCustomerLoginRequest;
}

export interface IMyCustomerBaseResponse {
  addresses: IMyCustomerAddressResponse[];
  authenticationMode: 'Password' | string;
  billingAddressIds: string[];
  dateOfBirth: string;
  email: string;
  firstName: string;
  id: string;
  isEmailVerified: boolean;
  lastName: string;
  password: string;
  shippingAddressIds: string[];
  version: number;
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
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
