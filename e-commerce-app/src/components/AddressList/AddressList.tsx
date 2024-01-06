import { FC } from 'react';
import { Box } from '@mui/material';
import { AddressItem } from '../AddressItem/AddressItem';
import type { Board } from '../../pages/UserPage/UserAddresses';
import { AddressPanel } from '../AddressPanel/AddressPanel';
import { IMyCustomerApiAddressRequest } from '../../types/addressesTypes';

interface TodoListProps {
  editTodoId: Board['id'] | null;
  todoList: Board[];
  onDeleteAddr: (id: Board['id']) => void;
  onCheckAddr: (id: Board['id']) => void;
  onEdit: (id: Board['id']) => void;
  onChangeAddr: ({ name, street, city, country, postcode }: Omit<Board, 'id' | 'checked'>) => void;
  address: IMyCustomerApiAddressRequest | undefined;
}

export const AddressList: FC<TodoListProps> = ({
  todoList,
  editTodoId,
  onChangeAddr,
  onDeleteAddr,
  onCheckAddr,
  onEdit,
  address,
}) => (
  <Box>
    {todoList.map((todo) => {
      if (todo.id === editTodoId)
        return <AddressPanel mode="edit" onChangeAddr={onChangeAddr} editTodo={todo} />;
      return (
        <AddressItem
          key={todo.id}
          todo={todo}
          onDeleteAddr={onDeleteAddr}
          onCheckAddr={onCheckAddr}
          onEdit={onEdit}
          address={address}
        />
      );
    })}
  </Box>
);
