import { IActionCart } from './updateCartActionsTypes';

export interface IUpdateCartApiDataRequest {
  version: number;
  actions: IActionCart[];
}

export interface IUpdateCartApiObjectRequest {
  cartId: string;
  token: string;
  data: IUpdateCartApiDataRequest;
}
