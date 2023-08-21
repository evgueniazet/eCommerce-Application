import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { IFormPageProps } from '../../interfaces/IFormPageProps';
import { FC } from 'react';


export const FormPage1: FC<IFormPageProps> = ({
  register,
  errors,
  validationHandler,
  values,
  isActive,
}) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        position: 'relative',
        height: isActive ? 'auto' : 0,
        opacity: isActive ? 1 : 0,
      }}
    >
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          autoComplete="off"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            onChange: (e) => validationHandler('email', e.target.value),
          })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Password"
          type="password"
          autoComplete="off"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            onChange: (e) => validationHandler('password', e.target.value),
          })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          autoComplete="off"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Conform password is required',
            onChange: (e) => validationHandler('confirmPassword', e.target.value, values),
          })}
        />
      </Grid>
    </Grid>
  );
};
