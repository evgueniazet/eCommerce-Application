import { FC, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { TextField, Paper, Button, Box, Grid } from '@mui/material';
import type { Board } from '../../pages/UserPage/UserAddresses';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const DEFAULT_TODO = { name: '', street: '', city: '', country: '', postcode: '' };

interface AddBoardPanelProps {
  mode: 'add';
  onAddAddress: ({ name, street, city, country, postcode }: Omit<Board, 'id' | 'checked'>) => void;
}

interface EditBoardPanelProps {
  mode: 'edit';
  editTodo: Omit<Board, 'id' | 'checked'>;
  onChangeAddr: ({ name, street, city, country, postcode }: Omit<Board, 'id' | 'checked'>) => void;
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
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            value={todo.name}
            onChange={onChange}
            name="name"
            label="Address name"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            value={todo.street}
            onChange={onChange}
            name="street"
            label="street"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField value={todo.city} onChange={onChange} name="city" label="city" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField
            value={todo.country}
            onChange={onChange}
            name="country"
            label="country"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            value={todo.postcode}
            onChange={onChange}
            name="postcode"
            label="postcode"
            fullWidth
          />
        </Grid>
      </Grid>
      <Box textAlign="right" marginTop={2}>
        <FormControlLabel
          sx={{ mr: '25px' }}
          value="end"
          control={<Checkbox />}
          label={
            <Box component="div" fontSize={10}>
              use as default address
            </Box>
          }
          labelPlacement="end"
        />
        <Button startIcon={<AddIcon />} variant="outlined" onClick={onClick}>
          {isEdit ? 'EDIT' : 'ADD'}
        </Button>
      </Box>
    </Paper>
  );
};
