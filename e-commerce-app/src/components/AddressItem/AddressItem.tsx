import { FC } from 'react';
import { Typography, Box, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import type { Board } from '../../pages/UserPage/UserForm2';

interface addressItemProps {
  todo: Board;
  onDeleteAddr: (id: Board['id']) => void;
  onCheckAddr: (id: Board['id']) => void;
  onEdit: (id: Board['id']) => void;
}

export const AddressItem: FC<addressItemProps> = ({ todo, onDeleteAddr, onCheckAddr, onEdit }) => (
  <Paper
    elevation={1}
    sx={{
      marginBottom: '10px',
      width: '100%',
      padding: '10px 15px',
      borderRadius: 1,
      gap: 2,
      opacity: todo.checked ? 0.5 : 1,
    }}
  >
    <Box textAlign="left">
      <Typography
        onClick={() => onCheckAddr(todo.id)}
        sx={{ cursor: 'pointer', textDecorationLine: todo.checked ? 'line-through' : 'none' }}
        variant="h4"
        component="h4"
        gutterBottom
      >
        {todo.name}
      </Typography>
      <Typography variant="subtitle1" component="div" gutterBottom>
        {todo.description}
      </Typography>
    </Box>
    <Box display="flex" justifyContent="flex-end">
      <IconButton onClick={() => onEdit(todo.id)} color="primary" aria-label="edit">
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => onDeleteAddr(todo.id)} color="error" aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </Box>
  </Paper>
);
