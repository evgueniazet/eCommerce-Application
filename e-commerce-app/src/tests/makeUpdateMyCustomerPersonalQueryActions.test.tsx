import { makeUpdateMyCustomerPersonalQueryActions } from '../utils/updateMyCustomerUtils/makeUpdateMyCustomerPersonalQueryActions';

describe('makeUpdateMyCustomerPersonalQueryActions', () => {
  it('should return an array of update actions when there are changes', () => {
    const initial = {
      firstName: 'John',
      lastName: 'Doe',
      birthDate: '1990-01-01',
      email: 'john.doe@example.com',
    };

    const current = {
      firstName: 'Jane',
      lastName: 'Smith',
      birthDate: '1990-01-01',
      email: 'jane.smith@example.com',
    };

    const actionsArray = makeUpdateMyCustomerPersonalQueryActions(initial, current);

    expect(actionsArray).toContainEqual({
      action: 'setFirstName',
      firstName: 'Jane',
    });
    expect(actionsArray).toContainEqual({
      action: 'setLastName',
      lastName: 'Smith',
    });

    expect(actionsArray).toContainEqual({
      action: 'changeEmail',
      email: 'jane.smith@example.com',
    });

    expect(actionsArray).not.toContainEqual({
      action: 'setDateOfBirth',
      dateOfBirth: '1990-01-01',
    });
  });

  it('should return an empty array when there are no changes', () => {
    const initial = {
      firstName: 'John',
      lastName: 'Doe',
      birthDate: '1990-01-01',
      email: 'john.doe@example.com',
    };

    const current = {
      firstName: 'John',
      lastName: 'Doe',
      birthDate: '1990-01-01',
      email: 'john.doe@example.com',
    };

    const actionsArray = makeUpdateMyCustomerPersonalQueryActions(initial, current);
    expect(actionsArray).toHaveLength(0);
  });
});
