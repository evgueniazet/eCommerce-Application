import React, { FC, JSX } from 'react';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

interface IUserPersonalHeaderProps {
  title: string
  icon: React.ReactNode | string;
}

const UserPersonalHeader: FC<IUserPersonalHeaderProps> = ({title, icon}): JSX.Element => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={1}>
        {icon}

      </Grid>
      <Grid item xs={11}>
        <Typography component={'h2'}
                    variant="h5">
          {title}

        </Typography>
      </Grid>
    </Grid>
  );
};


export default UserPersonalHeader;
