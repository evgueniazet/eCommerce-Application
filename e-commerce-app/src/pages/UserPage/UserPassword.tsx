import { FC } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PageImg from '../../assets/images/UserPageImg.png';
import { IUserProps } from '../../interfaces/IUserProps';

export const UserPassword: FC<IUserProps> = ({
  register,
  validationHandler,
  errors,
  setValue,
  password,
  getValues,
}) => {
  console.log('password', password);

  const values = {
    password: getValues?.('password') ?? '',
    confirmPassword: getValues?.('confirmPassword') ?? '',
    countryShipping: getValues?.('countryShipping') ?? '',
    countryBilling: getValues?.('countryBilling') ?? '',
  };

  return (
    <Box sx={{ width: 350, margin: '0 auto' }}>
      <Grid item xs={12} textAlign={'center'}>
        <img src={PageImg} alt="Image1" width={200} />
      </Grid>
      <Grid item xs={12} mt={2}>
        <TextField
          fullWidth
          label="Current password"
          type="password"
          autoComplete="off"
          error={!!errors.currentPassword}
          helperText={errors.currentPassword?.message}
          {...register('currentPassword', {
            required: 'Current Password is required',
            validate: (value) => {
              return value === password || 'Current Password does not match';
            },
          })}
        />
        <Grid item xs={12} mt={5}>
          <TextField
            fullWidth
            label="New password"
            type="password"
            autoComplete="off"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password', {
              onChange: (e) => validationHandler('password', e.target.value, values),
            })}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <TextField
            fullWidth
            label="Confirm new password"
            type="password"
            autoComplete="off"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              onChange: (e) => validationHandler('confirmPassword', e.target.value, values),
            })}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
