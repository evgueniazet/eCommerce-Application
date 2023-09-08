import { MakeUpdateMyCustomerPersonalQueryActionsType } from '../../types/utilsTypes/IMakeUpdateMyCustomerPersonalQueryActions';
import {
  IUpdateMyCustomerActionChangeEmail,
  IUpdateMyCustomerActionSetDateOfBirth,
  IUpdateMyCustomerActionSetFirstName,
  IUpdateMyCustomerActionSetLastName,
  UpdateMyCustomerActionsType,
} from '../../types/updateMyCustomerTypes/updateMyCustomerActionTypes';

export const makeUpdateMyCustomerPersonalQueryActions: MakeUpdateMyCustomerPersonalQueryActionsType =
  (initial, current) => {
    const actionsArray: UpdateMyCustomerActionsType[] = [];

    if (current.firstName && current.firstName !== initial.firstName) {
      const updateAction: IUpdateMyCustomerActionSetFirstName = {
        action: 'setFirstName',
        firstName: current.firstName,
      };
      console.log('update first name: ', updateAction);
      actionsArray.push(updateAction);
    }

    if (current.lastName && current.lastName !== initial.lastName) {
      const updateAction: IUpdateMyCustomerActionSetLastName = {
        action: 'setLastName',
        lastName: current.lastName,
      };
      console.log('update last name: ', updateAction);
      actionsArray.push(updateAction);
    }

    if (current.birthDate && current.birthDate !== initial.birthDate) {
      const updateAction: IUpdateMyCustomerActionSetDateOfBirth = {
        action: 'setDateOfBirth',
        dateOfBirth: current.birthDate,
      };
      console.log('update date of birth: ', updateAction);
      actionsArray.push(updateAction);
    }

    if (current.email && current.email !== initial.email) {
      const updateAction: IUpdateMyCustomerActionChangeEmail = {
        action: 'changeEmail',
        email: current.email,
      };
      console.log('update email: ', updateAction);
      actionsArray.push(updateAction);
    }

    return actionsArray;
  };
