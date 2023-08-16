import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DatePicker from '@mui/lab/DatePicker';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IRegistrationFormData } from '../../interfaces/IRegistrationFormData';
import { useValidate } from '../../hooks/useValidate';

export const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<IRegistrationFormData>();

  const { errors: validationErrors, validateField } = useValidate();

  const onSubmit: SubmitHandler<IRegistrationFormData> = (data) => {
    console.log('data', data);
  };

  const defaultCountry = 'USA';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Email"
        {...register('email', { required: 'Email is required' })}
        variant="outlined"
        margin="normal"
        error={!!validationErrors.email}
        helperText={validationErrors.email || errors.email?.message}
        onBlur={(e) => validateField('email', e.target.value)}
        fullWidth
      />
      <TextField
        label="Password"
        {...register('password', {
          required: 'Password is required',
        })}
        type="password"
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!validationErrors.password}
        helperText={validationErrors.password || errors.password?.message}
        onChange={(e) => validateField('password', e.target.value)}
      />
      <TextField
        label="Confirm Password"
        {...register('confirmPassword', {
          required: 'Confirm Password is required',
        })}
        type="password"
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={(e) => validateField('confirmPassword', e.target.value, getValues('password'))}
        error={!!validationErrors.confirmPassword}
        helperText={validationErrors.confirmPassword || errors.confirmPassword?.message}
      />
      <TextField
        label="First Name"
        variant="outlined"
        margin="normal"
        fullWidth
        {...register('firstName', {
          required: 'First Name is required',
        })}
        error={!!validationErrors.firstName}
        helperText={validationErrors.firstName || errors.firstName?.message}
        onChange={(e) => validateField('firstName', e.target.value)}
      />

      <TextField
        label="Last Name"
        variant="outlined"
        margin="normal"
        fullWidth
        {...register('lastName', {
          required: 'Last Name is required',
        })}
        error={!!validationErrors.lastName}
        helperText={validationErrors.lastName || errors.lastName?.message}
        onChange={(e) => validateField('lastName', e.target.value)}
      />
      <DatePicker
        label="Birth date"
        value={getValues('birthDate') || null}
        // onChange={(date: Date | null) => {
        //   setValue('birthDate', date, { shouldValidate: true });
        //   validateField('birthDate', date);
        // }}
        // renderInput={(params) => <TextField {...params} variant="outlined" margin="normal" />}
        error={!!validationErrors.birthDate || !!errors.birthDate}
        helperText={validationErrors.birthDate || errors.birthDate?.message}
      />
      <TextField
        label="Street Address"
        variant="outlined"
        margin="normal"
        fullWidth
        {...register('streetAddress', {
          required: 'Street address is required',
        })}
        error={!!validationErrors.streetAddress}
        helperText={validationErrors.streetAddress || errors.streetAddress?.message}
        onChange={(e) => validateField('streetAddress', e.target.value)}
      />
      <TextField
        label="City"
        variant="outlined"
        margin="normal"
        fullWidth
        {...register('city', {
          required: 'City is required',
        })}
        error={!!validationErrors.city}
        helperText={validationErrors.city || errors.city?.message}
        onChange={(e) => validateField('city', e.target.value)}
      />

      <Select
        label="Country"
        {...register('country', {
          required: 'Country is required',
        })}
        fullWidth
        value={getValues('country') || defaultCountry}
        onChange={(e) => {
          const selectedCountry = e.target.value as string;
          setValue('country', selectedCountry);
          validateField('country', selectedCountry);
        }}
        error={!!validationErrors.country}
      >
        <MenuItem value="USA">USA</MenuItem>
        <MenuItem value="Canada">Canada</MenuItem>
        <MenuItem value="UK">UK</MenuItem>
        <MenuItem value="Australia">Australia</MenuItem>
      </Select>
      <TextField
        label="Postal Code"
        variant="outlined"
        margin="normal"
        fullWidth
        {...register('postalCode', {
          required: 'Postal code is required',
        })}
        onChange={(e) => validateField('postalCode', e.target.value, getValues('country'))}
        error={!!validationErrors.postalCode}
        helperText={validationErrors.postalCode || errors.postalCode?.message}
      />
      <Button type="submit" variant="contained" color="primary">
        Register
      </Button>
    </form>
  );
};

export default RegistrationForm;
