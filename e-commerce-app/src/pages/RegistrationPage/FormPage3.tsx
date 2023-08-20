import {
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { IFormPageProps } from '../../interfaces/IFormPageProps';

/* eslint-disable react/prop-types */

export const FormPage3: React.FC<IFormPageProps> = ({
  register,
  errors,
  validationHandler,
  values,
  isActive,
}) => {
  const defaultCountry = 'USA';

  return (
    <div
      style={{
        position: 'relative',
        height: isActive ? 'initial' : 0,
        opacity: isActive ? 1 : 0,
        visibility: isActive ? 'visible' : 'hidden',
      }}
    >
      <p style={{ margin: 0 }}>Address fields:</p>
      <Grid container>
        <Grid item xs={12} mt={2}>
          <TextField
            fullWidth
            label="Street"
            autoComplete="off"
            error={!!errors.streetAddress}
            helperText={errors.streetAddress?.message}
            {...register('streetAddress', {
              required: 'Street address is required',
              onChange: (e) => validationHandler('streetAddress', e.target.value),
            })}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <TextField
            fullWidth
            label="City"
            autoComplete="off"
            error={!!errors.city}
            helperText={errors.city?.message}
            {...register('city', {
              required: 'City is required',
              onChange: (e) => validationHandler('city', e.target.value),
            })}
          />
        </Grid>

        <Grid item xs={12} mt={2}>
          <InputLabel>Country</InputLabel>
          <Select
            fullWidth
            label="Country"
            value={values?.country || defaultCountry}
            {...register('country', {
              required: 'Country is required',
              onChange: (e) => validationHandler('country', e.target.value),
            })}
          >
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
            <MenuItem value="UK">UK</MenuItem>
            <MenuItem value="Australia">Australia</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} mt={2}>
          <TextField
            fullWidth
            label="Postal Code"
            autoComplete="off"
            error={!!errors.postalCode}
            helperText={errors.postalCode?.message}
            {...register('postalCode', {
              required: 'Postal code is required',
              onChange: (e) => validationHandler('postalCode', e.target.value, values),
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive web-site promotions"
          />
        </Grid>
      </Grid>
    </div>
  );
};
