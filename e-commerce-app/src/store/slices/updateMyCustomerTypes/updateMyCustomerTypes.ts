import { UpdateMyCustomerActionType } from './updateMyCustomerActionTypes';

export interface IUpdateMyCustomer {
  version: number;
  actions: UpdateMyCustomerActionType[];
}

export interface IUpdateMyCustomerRequest {
  token: string;
  data: IUpdateMyCustomer;
}
