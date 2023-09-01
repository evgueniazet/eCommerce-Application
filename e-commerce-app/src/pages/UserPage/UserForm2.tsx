import { FC, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { AddressPanel } from '../../components/Panel/Panel';
import { BoardList } from '../../components/AddressList/AddressList';

export type Board = {
  id: number;
  name: string;
  description: string;
  checked: boolean;
};

const DEFAULT_TODO_LIST = [
  { id: 1, name: 'Address 1', description: 'description 1', checked: false },
  { id: 2, name: 'Address 2', description: 'description 2', checked: false },
  {
    id: 3,
    name: 'Address 3',
    description: 'description 3',
    checked: false,
  },
];

export const UserForm2: FC = () => {
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [todoList, setTodoList] = useState(DEFAULT_TODO_LIST);

  const onEdit = (id: Board['id']) => {
    setEditTodoId(id);
  };

  const onDeleteAddr = (id: Board['id']) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const onAddAddress = ({ name, description }: Omit<Board, 'id' | 'checked'>) => {
    setTodoList([
      ...todoList,
      { id: todoList[todoList.length - 1].id + 1, description, name, checked: false },
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

  const onChangeAddr = ({ name, description }: Omit<Board, 'id' | 'checked'>) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === editTodoId) {
          return { ...todo, name, description };
        }
        return todo;
      }),
    );
    setEditTodoId(null);
  };

  return (
    <Box marginTop={5} height="100%" display="flex" justifyContent="center" alignContent="center">
      <Box display="flex" flexDirection="column" width="500px">
        <Typography variant="h6">Shipping Addresses: {todoList.length}</Typography>
        <AddressPanel mode="add" onAddAddress={onAddAddress} />
        <BoardList
          editTodoId={editTodoId}
          todoList={todoList}
          onDeleteAddr={onDeleteAddr}
          onCheckAddr={onCheckAddr}
          onEdit={onEdit}
          onChangeAddr={onChangeAddr}
        />
      </Box>
    </Box>
  );
};
