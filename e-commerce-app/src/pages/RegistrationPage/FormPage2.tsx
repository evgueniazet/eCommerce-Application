import { TextField, Grid } from '@mui/material';
import { IFormPageProps } from '../../interfaces/IFormPageProps';

/* eslint-disable react/prop-types */

export const FormPage2: React.FC<IFormPageProps> = ({
  register,
  errors,
  validationHandler,
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
          label="First Name"
          autoComplete="off"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          {...register('firstName', {
            required: 'First Name is required',
            onChange: (e) => validationHandler('firstName', e.target.value),
          })}
        />
      </Grid>
      <Grid item xs={12} mt={2}>
        <TextField
          fullWidth
          label="Last Name"
          autoComplete="off"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          {...register('lastName', {
            required: 'Last Name is required',
            onChange: (e) => validationHandler('lastName', e.target.value),
          })}
        />
      </Grid>
      <Grid item xs={12} mt={2}>
        <TextField
          fullWidth
          type="date"
          label="Date of birth"
          autoComplete="off"
          InputLabelProps={{ shrink: true }}
          error={!!errors.birthDate}
          helperText={errors.birthDate?.message}
          {...register('birthDate', {
            required: 'Birth Date is required',
            onChange: (e) => validationHandler('birthDate', e.target.value),
          })}
        />
      </Grid>
    </Grid>
  );
};
