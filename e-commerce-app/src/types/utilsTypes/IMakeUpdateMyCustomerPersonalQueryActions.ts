import { UpdateMyCustomerActionsType } from '../updateMyCustomerTypes/updateMyCustomerActionTypes';

export interface IMakeUpdateMyCustomerPersonalQueryObject {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
}

export type MakeUpdateMyCustomerPersonalQueryActionsType = (
  initial: IMakeUpdateMyCustomerPersonalQueryObject,
  current: Partial<IMakeUpdateMyCustomerPersonalQueryObject>,
) => UpdateMyCustomerActionsType[];
