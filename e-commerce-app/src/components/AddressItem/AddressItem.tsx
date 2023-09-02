import { FC } from 'react';
import { Typography, Box, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import type { Board } from '../../pages/UserPage/UserAdresses';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

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
      marginBottom: '5px',
      width: '100%',
      padding: '5px 10px',
      borderRadius: 1,
      gap: 1,
      opacity: todo.checked ? 0.5 : 1,
    }}
  >
    <Box textAlign="left">
      <Typography
        onClick={() => onCheckAddr(todo.id)}
        sx={{ cursor: 'pointer', textDecorationLine: todo.checked ? 'line-through' : 'none' }}
        variant="h6"
        component="h6"
        gutterBottom
      >
        {todo.name}
      </Typography>
    </Box>
    <Box display="flex" textAlign="left">
      <Typography variant="subtitle1" component="div" gutterBottom>
        {todo.street}, {todo.city}, {todo.country}, {todo.postcode}
      </Typography>
    </Box>
    <Box display="flex" justifyContent="flex-end">
      <FormControlLabel
        sx={{ mr: '25px' }}
        value="end"
        control={<Checkbox />}
        label={
          <Box component="div" fontSize={10}>
            default shipping address
          </Box>
        }
        labelPlacement="end"
      />
      <FormControlLabel
        sx={{ mr: '25px' }}
        value="end"
        control={<Checkbox />}
        label={
          <Box component="div" fontSize={10}>
            default billing address
          </Box>
        }
        labelPlacement="end"
      />

      <IconButton onClick={() => onEdit(todo.id)} color="primary" aria-label="edit">
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => onDeleteAddr(todo.id)} color="error" aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </Box>
  </Paper>
);
