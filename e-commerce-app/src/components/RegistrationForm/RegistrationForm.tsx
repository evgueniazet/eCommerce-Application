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
        helperText={errors.email && 'Enter a valid e-mail address'}
        fullWidth
      />
      <TextField label="Password" type="password" variant="outlined" margin="normal" fullWidth />

      <TextField
        label="Repeat Password"
        type="password"
        variant="outlined"
        margin="normal"
        fullWidth
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
