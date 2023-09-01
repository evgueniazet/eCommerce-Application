import { FC, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { TextField, Paper, Button, Box, Stack } from '@mui/material';
import type { Board } from '../../pages/UserPage/UserForm2';

const DEFAULT_TODO = { name: '', description: '' };

interface AddBoardPanelProps {
  mode: 'add';
  onAddAddress: ({ name, description }: Omit<Board, 'id' | 'checked'>) => void;
}

interface EditBoardPanelProps {
  mode: 'edit';
  editTodo: Omit<Board, 'id' | 'checked'>;
  onChangeAddr: ({ name, description }: Omit<Board, 'id' | 'checked'>) => void;
}

type PanelProps = AddBoardPanelProps | EditBoardPanelProps;

export const AddressPanel: FC<PanelProps> = (props) => {
  const isEdit = props.mode === 'edit';
  const [todo, setTodo] = useState(isEdit ? props.editTodo : DEFAULT_TODO);

  const onClick = () => {
    if (isEdit) {
      return props.onChangeAddr(todo);
    }
    props.onAddAddress(todo);
    setTodo(DEFAULT_TODO);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  return (
    <Paper
      elevation={1}
      sx={{
        marginBottom: '10px',
        width: '100%',
        padding: '10px 15px',
        borderRadius: 1,
        gap: 2,
      }}
    >
      <Stack direction="row" spacing={1}>
        <TextField value={todo.name} onChange={onChange} name="name" label="name" fullWidth />
        <TextField
          value={todo.description}
          onChange={onChange}
          name="description"
          label="description"
          fullWidth
        />
      </Stack>
      <Box textAlign="right" marginTop={2}>
        <Button startIcon={<AddIcon />} variant="outlined" onClick={onClick}>
          {isEdit ? 'EDIT' : 'ADD'}
        </Button>
      </Box>
    </Paper>
  );
};
