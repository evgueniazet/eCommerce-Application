import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IRegistrationFormData } from '../../interfaces/IRegistrationFormData';

export const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IRegistrationFormData>();

  const onSubmit: SubmitHandler<IRegistrationFormData> = (data) => {
    console.log('data', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Email"
        {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
        variant="outlined"
        margin="normal"
        error={!!errors.email}
        helperText={errors.email && 'Enter a valid e-mail address'}
        fullWidth
      />
      <TextField
        label="Password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long',
          },
          maxLength: {
            value: 15,
            message: 'Password must not exceed 15 characters',
          },
        })}
        type="password"
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <TextField
        label="Repeat Password"
        {...register('repeatPassword', {
          required: 'Repeat Password is required',
          validate: (value) => {
            const truePassword = getValues('password');
            return value === truePassword || 'Passwords do not match';
          },
        })}
        type="password"
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.repeatPassword}
        helperText={errors.repeatPassword?.message}
      />
      <TextField
        label="First Name"
        variant="outlined"
        margin="normal"
        fullWidth
        {...register('firstName', {
          required: 'First Name is required',
          maxLength: {
            value: 20,
            message: 'First Name must not exceed 20 characters',
          },
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: 'Enter a valid first name',
          },
        })}
        error={!!errors.firstName}
        helperText={errors.firstName && errors.firstName.message}
      />

      <TextField
        label="Last Name"
        variant="outlined"
        margin="normal"
        fullWidth
        {...register('lastName', {
          required: 'Last Name is required',
          maxLength: {
            value: 20,
            message: 'Last Name must not exceed 20 characters',
          },
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: 'Enter a valid last name',
          },
        })}
        error={!!errors.lastName}
        helperText={errors.lastName && errors.lastName.message}
      />
      {/* <TextField
        label="Birth Date"
        variant="outlined"
        margin="normal"
        fullWidth
        {...register('birthDate', {
          required: 'Birth date is required',
          maxLength: {
            value: 20,
            message: 'Birth date  must not exceed 20 characters',
          },
          pattern: {
            value: /^[0-9]+$/,
            message: 'Enter a valid birth date',
          },
        })}
      /> */}
      <TextField
        label="Street Address"
        variant="outlined"
        margin="normal"
        fullWidth
        {...register('streetAddress', {
          required: 'Street address is required',
          maxLength: {
            value: 20,
            message: 'Street address must not exceed 20 characters',
          },
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: 'Enter a valid street address',
          },
        })}
        error={!!errors.streetAddress}
        helperText={errors.streetAddress?.message}
      />
      <TextField
        label="House Number"
        variant="outlined"
        margin="normal"
        fullWidth
        {...register('houseNumber', {
          required: 'House Number is required',
          maxLength: {
            value: 10,
            message: 'House Number must not exceed 20 characters',
          },
          pattern: {
            value: /^[0-9]+$/,
            message: 'Enter a valid house number',
          },
        })}
        error={!!errors.houseNumber}
        helperText={errors.houseNumber?.message}
      />
      <TextField
        label="City"
        variant="outlined"
        margin="normal"
        fullWidth
        {...register('city', {
          required: 'City is required',
          maxLength: {
            value: 20,
            message: 'City must not exceed 20 characters',
          },
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: 'Enter a valid city',
          },
        })}
        error={!!errors.city}
        helperText={errors.city?.message}
      />
      <TextField
        label="Postal Code"
        variant="outlined"
        margin="normal"
        fullWidth
        {...register('postalCode', {
          required: 'Postal code is required',
          maxLength: {
            value: 20,
            message: 'Postal code must not exceed 20 characters',
          },
          pattern: {
            value: /^[0-9]+$/,
            message: 'Enter a valid postal code',
          },
        })}
        error={!!errors.postalCode}
        helperText={errors.postalCode?.message}
      />
      <TextField
        label="Country"
        variant="outlined"
        margin="normal"
        fullWidth
        {...register('country', {
          required: 'Country is required',
          maxLength: {
            value: 20,
            message: 'Country must not exceed 20 characters',
          },
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: 'Enter a valid country',
          },
        })}
        error={!!errors.country}
        helperText={errors.country?.message}
      />
      <Button type="submit" variant="contained" color="primary">
        Register
      </Button>
    </form>
  );
};

export default RegistrationForm;
