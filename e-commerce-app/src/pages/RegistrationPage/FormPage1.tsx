import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { IFormPageProps } from '../../interfaces/IFormPageProps';

/* eslint-disable react/prop-types */

export const FormPage1: React.FC<IFormPageProps> = ({
  register,
  errors,
  validationHandler,
  values,
  isActive,
}) => {
  return (
    <Grid
      container
      sx={{
        position: 'relative',
        height: isActive ? 'initial' : 0,
        opacity: isActive ? 1 : 0,
      }}
    >
      <Grid item xs={12} mt={2}>
        <TextField
          fullWidth
          label="Email"
          type="text"
          autoComplete="off"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            onChange: (e) => validationHandler('email', e.target.value),
          })}
        />
      </Grid>
      <Grid item xs={12} mt={2}>
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
      <Grid item xs={12} mt={2}>
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
