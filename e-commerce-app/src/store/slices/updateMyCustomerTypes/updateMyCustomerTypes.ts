import { UpdateMyCustomerActionsType } from './updateMyCustomerActionTypes';

export interface IUpdateMyCustomer {
  version: number;
  actions: UpdateMyCustomerActionsType[];
}

export interface IUpdateMyCustomerRequest {
  token: string;
  data: IUpdateMyCustomer;
}
