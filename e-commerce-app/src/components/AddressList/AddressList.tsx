import { FC } from 'react';
import { Box } from '@mui/material';
import { AddressItem } from '../AddressItem/AddressItem';
import type { Board } from '../../pages/UserPage/UserAdresses';
import { AddressPanel } from '../Panel/Panel';

interface TodoListProps {
  editTodoId: Board['id'] | null;
  todoList: Board[];
  onDeleteAddr: (id: Board['id']) => void;
  onCheckAddr: (id: Board['id']) => void;
  onEdit: (id: Board['id']) => void;
  onChangeAddr: ({ name, street, city, country, postcode }: Omit<Board, 'id' | 'checked'>) => void;
}

export const BoardList: FC<TodoListProps> = ({
  todoList,
  editTodoId,
  onChangeAddr,
  onDeleteAddr,
  onCheckAddr,
  onEdit,
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
        />
      );
    })}
  </Box>
);
