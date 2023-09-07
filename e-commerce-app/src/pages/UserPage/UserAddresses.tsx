import { FC, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { AddressPanel } from '../../components/AddressPanel/AddressPanel';
import { AddressList } from '../../components/AddressList/AddressList';
import { IUserProps } from '../../interfaces/IUserProps';
import { IMyCustomerApiAddressRequest } from '../../types/addressesTypes';

export type Board = {
  id: number;
  name: string;
  street: string;
  city: string;
  country: string;
  postcode: string;
  checked: boolean;
};

const DEFAULT_TODO_LIST = [
  {
    id: 1,
    name: 'Address 1',
    street: 'street 1',
    city: 'city 1',
    country: 'country 1',
    postcode: 'code 1',
    checked: false,
  },
];

export const UserAddresses: FC<IUserProps> = ({
  register,
  validationHandler,
  errors,
  userAddresses,
  setValue,
}) => {
  if (!userAddresses) {
    return null;
  }

  let shippingAddress;
  let billingAddress;

  if (
    userAddresses[0] !== undefined &&
    userAddresses[1] !== undefined &&
    Array.isArray(userAddresses[0]) &&
    Array.isArray(userAddresses[1])
  ) {
    shippingAddress = (userAddresses[0] as IMyCustomerApiAddressRequest[]).find((item) => {
      return (
        typeof item === 'object' &&
        item !== null &&
        'id' in item &&
        item.id === (userAddresses[1] as string[])[0]
      );
    });

    billingAddress = (userAddresses[0] as IMyCustomerApiAddressRequest[]).find((item) => {
      return (
        typeof item === 'object' &&
        item !== null &&
        'id' in item &&
        item.id === (userAddresses[2] as string[])[0]
      );
    });
  }

  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [todoList, setTodoList] = useState(DEFAULT_TODO_LIST);

  const onEdit = (id: Board['id']) => {
    setEditTodoId(id);
  };

  const onDeleteAddr = (id: Board['id']) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const onAddAddress = ({
    name,
    street,
    city,
    country,
    postcode,
  }: Omit<Board, 'id' | 'checked'>) => {
    setTodoList([
      ...todoList,
      {
        id: todoList[todoList.length - 1].id + 1,
        name,
        street,
        city,
        country,
        postcode,
        checked: false,
      },
    ]);
  };

  const onCheckAddr = (id: Board['id']) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      }),
    );
  };

  const onChangeAddr = ({
    name,
    street,
    city,
    country,
    postcode,
  }: Omit<Board, 'id' | 'checked'>) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === editTodoId) {
          return { ...todo, name, street, city, country, postcode };
        }
        return todo;
      }),
    );
    setEditTodoId(null);
  };

  return (
    <Box marginTop={5} height="100%" display="flex" justifyContent="center" alignContent="center">
      <Box display="flex" flexDirection="column" width="500px">
        <Typography textAlign="center" variant="h5">
          Shipping adresses: {todoList.length}
        </Typography>
        <AddressList
          editTodoId={editTodoId}
          todoList={todoList}
          onDeleteAddr={onDeleteAddr}
          onCheckAddr={onCheckAddr}
          onEdit={onEdit}
          onChangeAddr={onChangeAddr}
          address={shippingAddress}
        />
        <AddressPanel mode="add" onAddAddress={onAddAddress} />
      </Box>
      <Box display="flex" flexDirection="column" width="500px">
        <Typography textAlign="center" variant="h5">
          Billing adresses: {todoList.length}
        </Typography>
        <AddressList
          editTodoId={editTodoId}
          todoList={todoList}
          onDeleteAddr={onDeleteAddr}
          onCheckAddr={onCheckAddr}
          onEdit={onEdit}
          onChangeAddr={onChangeAddr}
          address={billingAddress}
        />
        <AddressPanel mode="add" onAddAddress={onAddAddress} />
      </Box>
    </Box>
  );
};
