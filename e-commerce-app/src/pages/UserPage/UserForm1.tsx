import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { FC } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';

export const UserForm1: FC = () => {
  return (
    <Grid container>
      <Grid item xs={12} mt={2} sx={{ display: 'flex' }}>
        <TextField fullWidth label="First Name" autoComplete="off" />
        <Button>
          <EditIcon />
        </Button>
      </Grid>
      <Grid item xs={12} mt={2} sx={{ display: 'flex' }}>
        <TextField fullWidth label="Last Name" autoComplete="off" />
        <Button>
          <EditIcon />
        </Button>
      </Grid>
      <Grid item xs={12} mt={2} sx={{ display: 'flex' }}>
        <TextField fullWidth type="date" label="Date of birth" autoComplete="off" />
        <Button>
          <EditIcon />
        </Button>
      </Grid>
      <Grid item xs={12} mt={2} sx={{ display: 'flex' }}>
        <TextField fullWidth label="Email" type="text" autoComplete="off" />
        <Button>
          <EditIcon />
        </Button>
      </Grid>
      <Box sx={{ width: '100%', display: 'flex', pt: 4, gap: '30%' }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ backgroundColor: 'mediumaquamarine', color: 'black' }}
        >
          Update
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ backgroundColor: 'beige', color: 'black' }}
        >
          Cancel
        </Button>
      </Box>
    </Grid>
  );
};
