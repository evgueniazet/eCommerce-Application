import {
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { FC, useState } from 'react';
import { IFormPageProps } from '../../interfaces/IFormPageProps';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';

export const FormPage4: FC<IFormPageProps> = ({
  register,
  errors,
  validationHandler,
  values,
  isActive,
  billingFlag,
  setBillingFlag,
}) => {
  const defaultCountry = 'Poland';

  const [isChecked, setBillingChecked] = useState(billingFlag);

  const handleCheckboxChange = () => {
    if (setBillingFlag !== undefined) {
      setBillingFlag(!billingFlag);
      setBillingChecked(!billingFlag);
      !isActive;
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
      <p style={{ margin: 0 }}>Billing Address:</p>
      <Grid container>
        <Grid item xs={12} mt={2}>
          <TextField
            fullWidth
            label="Street"
            autoComplete="off"
            error={!!errors.streetAddressBilling}
            helperText={errors.streetAddressBilling?.message}
            {...register('streetAddressBilling', {
              required: 'Street address is required',
              onChange: (e) => validationHandler('streetAddressBilling', e.target.value),
            })}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <TextField
            fullWidth
            label="City"
            autoComplete="off"
            error={!!errors.cityBilling}
            helperText={errors.cityBilling?.message}
            {...register('cityBilling', {
              required: 'City is required',
              onChange: (e) => validationHandler('cityBilling', e.target.value),
            })}
          />
        </Grid>

        <Grid item xs={12} mt={2}>
          <InputLabel>Country</InputLabel>
          <Select
            fullWidth
            label="Country"
            value={values?.countryBilling || defaultCountry}
            {...register('countryBilling', {
              required: 'Country is required',
              onChange: (e) => validationHandler('countryBilling', e.target.value),
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
            error={!!errors.postalCodeBilling}
            helperText={errors.postalCodeBilling?.message}
            {...register('postalCodeBilling', {
              required: 'Postal code is required',
              onChange: (e) => validationHandler('postalCodeBilling', e.target.value, values),
            })}
          />
        </Grid>

        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="use as default billing address"
          />
          <FormControlLabel
            control={<Checkbox checked={isChecked} />}
            onChange={handleCheckboxChange}
            label="also use as shipping address"
          />
          <FormControlLabel control={<Checkbox defaultChecked />} label="use only one address" />
        </FormGroup>
      </Grid>
    </div>
  );
};
