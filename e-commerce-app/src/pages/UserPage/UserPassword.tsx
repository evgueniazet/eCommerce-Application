import { FC } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PageImg from '../../assets/images/UserPageImg.png';

export const UserPassword: FC = () => {
  return (
    <Box sx={{ width: 350, margin: '0 auto' }}>
      <Grid item xs={12} textAlign={'center'}>
        <img src={PageImg} alt="Image1" width={200} />
      </Grid>
      <Grid item xs={12} mt={2}>
        <TextField fullWidth label="Current password" type="password" autoComplete="off" />
        <Grid item xs={12} mt={5}>
          <TextField fullWidth label="New password" type="password" autoComplete="off" />
        </Grid>
        <Grid item xs={12} mt={2}>
          <TextField fullWidth label="Confirm new password" type="password" autoComplete="off" />
        </Grid>
      </Grid>
    </Box>
  );
};
