import { UpdateMyCustomerActionsType } from './updateMyCustomerActionTypes';

export interface IUpdateMyCustomer {
  version: number;
  actions: UpdateMyCustomerActionsType[];
}

export interface IUpdateMyCustomerRequest {
  token: string;
  data: IUpdateMyCustomer;
}

export interface IChangePasswordMyCustomer {
  version: number;
  currentPassword: string;
  newPassword: string;
}

export interface IChangePasswordMyCustomerRequest {
  token: string;
  data: IChangePasswordMyCustomer;
}
