import { FC } from 'react';
import { IMyCustomerAddressResponse } from '../../types/addressesTypes';
import { Divider, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface IUserPersonalContactRowProps {
  address: IMyCustomerAddressResponse;
}

const UserPersonalContactRow: FC<IUserPersonalContactRowProps> = ({ address }) => {
  return (
    <Box pb={2}>
      <Grid container spacing={4} alignItems={'center'}>
        <Grid item xs={3}>
          <Typography variant="h6">Country:</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="subtitle1">{address.country}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4} alignItems={'center'}>
        <Grid item xs={3}>
          <Typography variant="h6">City:</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="subtitle1">{address.city}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4} alignItems={'center'}>
        <Grid item xs={3}>
          <Typography variant="h6">Street Name:</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="subtitle1">{address.streetName}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4} alignItems={'center'}>
        <Grid item xs={3}>
          <Typography variant="h6">Postal Code:</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="subtitle1">{address.postalCode}</Typography>
        </Grid>
      </Grid>
      <Divider variant="middle" />
    </Box>
  );
};

export default UserPersonalContactRow;
