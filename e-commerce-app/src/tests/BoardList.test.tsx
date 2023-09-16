import { render, screen } from '@testing-library/react';
import { BoardList } from '../components/AddressList/AddressList';

jest.mock('../components/Panel/Panel', () => ({
  AddressPanel: jest.fn(() => <div data-testid="mocked-address-panel" />),
}));

const sampleTodoList = [
  {
    id: 1,
    name: 'Address 1',
    street: 'Street 1',
    city: 'City 1',
    country: 'Country 1',
    postcode: '12345',
    checked: false,
  },
  {
    id: 2,
    name: 'Address 2',
    street: 'Street 2',
    city: 'City 2',
    country: 'Country 2',
    postcode: '67890',
    checked: false,
  },
];

const sampleAddress = {
  streetName: 'Street',
  postalCode: '54321',
  city: 'Sample City',
  country: 'Sample Country',
};

test('BoardList renders correctly', () => {
  const onDeleteAddr = jest.fn();
  const onCheckAddr = jest.fn();
  const onEdit = jest.fn();
  const onChangeAddr = jest.fn();

  render(
    <BoardList
      editTodoId={null}
      todoList={sampleTodoList}
      onDeleteAddr={onDeleteAddr}
      onCheckAddr={onCheckAddr}
      onEdit={onEdit}
      onChangeAddr={onChangeAddr}
      address={sampleAddress}
    />,
  );

  expect(screen.queryByTestId('mocked-address-panel')).toBeNull();

  expect(screen.getByText('Address 1')).toBeInTheDocument();
  expect(screen.getByText('Address 2')).toBeInTheDocument();
});
