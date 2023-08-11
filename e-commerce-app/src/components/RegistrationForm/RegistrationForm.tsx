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
      <TextField label="First Name" variant="outlined" margin="normal" fullWidth />
      <TextField label="Last Name" variant="outlined" margin="normal" fullWidth />
      <TextField label="Birthdate" variant="outlined" margin="normal" fullWidth />
      <TextField label="Street Address" variant="outlined" margin="normal" fullWidth />
      <TextField label="House Number" variant="outlined" margin="normal" fullWidth />
      <TextField label="City" variant="outlined" margin="normal" fullWidth />
      <TextField label="Postal Code" variant="outlined" margin="normal" fullWidth />
      <TextField label="Country" variant="outlined" margin="normal" fullWidth />
      <Button type="submit" variant="contained" color="primary">
        Register
      </Button>
    </form>
  );
};

export default RegistrationForm;
