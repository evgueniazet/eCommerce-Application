import { FC } from 'react';
import { Typography, Box, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import type { Board } from '../../pages/UserPage/UserAddresses';
import { IMyCustomerApiAddressRequest } from '../../types/addressesTypes';

interface addressItemProps {
  todo: Board;
  onDeleteAddr: (id: Board['id']) => void;
  onCheckAddr: (id: Board['id']) => void;
  onEdit: (id: Board['id']) => void;
  address: IMyCustomerApiAddressRequest | undefined;
}

export const AddressItem: FC<addressItemProps> = ({
  todo,
  onDeleteAddr,
  onCheckAddr,
  onEdit,
  address,
}) => (
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
      {address && (
        <Typography variant="subtitle1" component="div" gutterBottom>
          {address.streetName}, {address.city}, {address.country}, {address.postalCode}
        </Typography>
      )}
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
