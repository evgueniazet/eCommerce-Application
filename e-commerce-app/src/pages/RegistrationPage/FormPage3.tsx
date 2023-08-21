import { TextField, FormControlLabel, Grid, Select, MenuItem, InputLabel } from '@mui/material';
import { FC, useState } from 'react';
import { IFormPageProps } from '../../interfaces/IFormPageProps';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';

export const FormPage3: FC<IFormPageProps> = ({
  register,
  errors,
  validationHandler,
  values,
  isActive,
  shippingFlag,
  setShippingFlag,
  checkDefault,
  setCheckDefault,
}) => {
  const defaultCountry = 'Poland';

  const [isChecked, setShippingChecked] = useState(shippingFlag);

  const handleCheckboxChange = () => {
    if (setShippingFlag !== undefined) {
      setShippingFlag(!shippingFlag);
      setShippingChecked(!shippingFlag);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        height: isActive ? 'initial' : 0,
        opacity: isActive ? 1 : 0,
        visibility: isActive ? 'visible' : 'hidden',
      }}
    >
      <p style={{ margin: 0 }}>Shipping Address:</p>
      <Grid container>
        <Grid item xs={12} mt={2}>
          <TextField
            fullWidth
            label="Street"
            autoComplete="off"
            error={!!errors.streetAddressShipping}
            helperText={errors.streetAddressShipping?.message}
            {...register('streetAddressShipping', {
              required: 'Street address is required',
              onChange: (e) => validationHandler('streetAddressShipping', e.target.value),
            })}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <TextField
            fullWidth
            label="City"
            autoComplete="off"
            error={!!errors.cityShipping}
            helperText={errors.cityShipping?.message}
            {...register('cityShipping', {
              required: 'City is required',
              onChange: (e) => validationHandler('cityShipping', e.target.value),
            })}
          />
        </Grid>

        <Grid item xs={12} mt={2}>
          <InputLabel>Country</InputLabel>
          <Select
            fullWidth
            label="Country"
            value={values?.countryShipping || defaultCountry}
            {...register('countryShipping', {
              required: 'Country is required',
              onChange: (e) => validationHandler('countryShipping', e.target.value),
            })}
          >
            <MenuItem value="Canada">Canada</MenuItem>
            <MenuItem value="Poland">Poland</MenuItem>
            <MenuItem value="Germany">Germany</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} mt={2}>
          <TextField
            fullWidth
            label="Postal Code"
            autoComplete="off"
            error={!!errors.postalCodeShipping}
            helperText={errors.postalCodeShipping?.message}
            {...register('postalCodeShipping', {
              required: 'Postal code is required',
              onChange: (e) => validationHandler('postalCodeShipping', e.target.value, values),
            })}
          />
        </Grid>

        <FormGroup>
          {setCheckDefault && (
            <FormControlLabel
              control={
                <Switch
                  checked={checkDefault}
                  onChange={(e) => setCheckDefault(e.target.checked)}
                />
              }
              label="use as default shipping address"
            />
          )}
          <FormControlLabel
            control={<Checkbox checked={isChecked} />}
            onChange={handleCheckboxChange}
            label="also use as billing address"
          />
        </FormGroup>
      </Grid>
    </div>
  );
};
