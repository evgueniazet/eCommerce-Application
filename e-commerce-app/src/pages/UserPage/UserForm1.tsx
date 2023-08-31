import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { FC } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export const UserForm1: FC = () => {
  return (
    <Grid
      container
      sx={{
        position: 'relative',
      }}
    >
      <Grid item xs={12} mt={2}>
        <TextField fullWidth label="First Name" autoComplete="off" />
      </Grid>
      <Grid item xs={12} mt={2}>
        <TextField fullWidth label="Last Name" autoComplete="off" />
      </Grid>
      <Grid item xs={12} mt={2}>
        <TextField fullWidth type="date" label="Date of birth" autoComplete="off" />
      </Grid>
      <Box sx={{ display: 'flex' }}>
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
