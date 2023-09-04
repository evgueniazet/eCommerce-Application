import React, { FC, JSX } from 'react';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface IUserPersonalRowProps {
  title: string
  value: string
}

const UserPersonalRow: FC<IUserPersonalRowProps> = ({title, value}): JSX.Element => {
  return (
    <Box>
      <Grid container spacing={3} alignItems={'center'}>
        <Grid item xs={3}>
          <Typography variant="h6">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="subtitle1">
            {value}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
export default UserPersonalRow;
