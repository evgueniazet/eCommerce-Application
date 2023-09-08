// IUpdateMyCustomerAction

import { IMyCustomerApiAddressRequest } from '../addressesTypes';

export interface IUpdateMyCustomerActionChangeEmail {
  action: 'changeEmail';
  email: string;
}

export interface IUpdateMyCustomerActionSetFirstName {
  action: 'setFirstName';
  firstName: string;
}

export interface IUpdateMyCustomerActionSetLastName {
  action: 'setLastName';
  lastName: string;
}

export interface IUpdateMyCustomerActionAddAddress {
  action: 'addAddress';
  address: IMyCustomerApiAddressRequest;
}

export interface IUpdateMyCustomerActionChangeAddress {
  action: 'changeAddress';
  addressId: string;
  address: IMyCustomerApiAddressRequest;
}

export interface IUpdateMyCustomerActionRemoveAddress {
  action: 'removeAddress';
  addressId: string;
}

export interface IUpdateMyCustomerActionSetDefaultShippingAddress {
  action: 'setDefaultShippingAddress';
  addressId: string;
}

export interface IUpdateMyCustomerActionAddShippingAddressId {
  action: 'addShippingAddressId';
  addressId: string;
}

export interface IUpdateMyCustomerActionRemoveShippingAddressId {
  action: 'removeShippingAddressId';
  addressId: string;
}

export interface IUpdateMyCustomerActionSetDefaultBillingAddress {
  action: 'setDefaultBillingAddress';
  addressId: string;
}

export interface IUpdateMyCustomerActionAddBillingAddressId {
  action: 'addBillingAddressId';
  addressId: string;
}

export interface IUpdateMyCustomerActionRemoveBillingAddressId {
  action: 'removeBillingAddressId';
  addressId: string;
}

export interface IUpdateMyCustomerActionSetDateOfBirth {
  action: 'setDateOfBirth';
  dateOfBirth: string;
}

export type UpdateMyCustomerActionsType =
  | IUpdateMyCustomerActionChangeEmail
  | IUpdateMyCustomerActionSetFirstName
  | IUpdateMyCustomerActionSetLastName
  | IUpdateMyCustomerActionAddAddress
  | IUpdateMyCustomerActionChangeAddress
  | IUpdateMyCustomerActionRemoveAddress
  | IUpdateMyCustomerActionSetDefaultShippingAddress
  | IUpdateMyCustomerActionAddShippingAddressId
  | IUpdateMyCustomerActionRemoveShippingAddressId
  | IUpdateMyCustomerActionSetDefaultBillingAddress
  | IUpdateMyCustomerActionAddBillingAddressId
  | IUpdateMyCustomerActionRemoveBillingAddressId
  | IUpdateMyCustomerActionSetDateOfBirth;
