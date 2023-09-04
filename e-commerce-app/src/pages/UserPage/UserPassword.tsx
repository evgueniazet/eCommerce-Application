import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { validateStrictPassword } from '../../validators/validatePassword';
import { validateConfirmPassword } from '../../validators/validateConfirmPassword';

interface IResetPasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const UserPassword = () => {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    control,
    formState: { errors }
  } = useForm<IResetPasswordForm>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    }, mode: 'onChange'
  });

  const inputPasswordHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, target: 'currentPassword' | 'newPassword' | 'confirmNewPassword') => {
    const val = e.target.value;
    let errStr = '';
    switch (target) {
      case 'currentPassword':
        setCurrentPassword(val);
        errStr = validateStrictPassword(val);

        break;
      case 'newPassword':
        setNewPassword(val);
        errStr = validateStrictPassword(val);
        break;
      case 'confirmNewPassword':
        setConfirmNewPassword(val);
        errStr = validateStrictPassword(val) || validateConfirmPassword(val, newPassword);
        break;
      default:
        setError('root', { message: 'Password is Required' });
        break;
    }
    if (errStr.length) {
      console.log(errStr, target);
      setError(target, {
        type: 'required',
        message: errStr,
      });
    }
  };

  console.log(errors);

  const submitNewPasswordHandler: SubmitHandler<IResetPasswordForm> = (data) => {
    console.log(data);
  };

  const onResetForm = () => {
    reset();
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <Box component={'form'}
         onSubmit={handleSubmit(submitNewPasswordHandler)}
         onReset={onResetForm}>
      <Grid container>
        <Grid item
              xs={12}
              mt={2}>
          <Controller name={'currentPassword'}
                      control={control}
                      render={({ fieldState, field }) => (
                        <TextField
                          fullWidth
                          label="Current password"
                          type="password"
                          autoComplete="off"
                          {...fieldState}
                          {...field}
                          {...register('currentPassword', {
                            required: 'Current Password is required',
                            onChange: (e) => inputPasswordHandler(e, 'currentPassword'),
                          })}
                          value={currentPassword}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message || errors.currentPassword?.message}
                        />
                      )}/>

        </Grid>

        <Grid item
              xs={12}
              mt={5}>
          <Controller name={'newPassword'}
                      control={control}
                      render={({ fieldState, field }) => (
                        <TextField
                          fullWidth
                          label="New password"
                          type="password"
                          autoComplete="off"
                          {...fieldState}
                          {...field}
                          {...register('newPassword', {
                            required: 'New Password is required',
                            onChange: (e) => inputPasswordHandler(e, 'newPassword'),
                          })}
                          error={!!fieldState.error}
                          helperText={fieldState.error ? fieldState.error.message : null}
                        />
                      )}/>
        </Grid>
        <Grid item
              xs={12}
              mt={2}>
          <Controller name={'confirmNewPassword'}
                      control={control}
                      render={({ fieldState, field }) => (
                        <TextField
                          fullWidth
                          label="Confirm password"
                          type="password"
                          autoComplete="off"
                          {...fieldState}
                          {...field}
                          {...register('confirmNewPassword', {
                            required: 'Confirm New Password is required',
                            onChange: (e) => inputPasswordHandler(e, 'confirmNewPassword'),
                          })}
                          error={!!fieldState.error}
                          helperText={fieldState.error ? fieldState.error.message : null}
                        />
                      )}/>
        </Grid>

        <Grid item
              xs={12}>
          <Box sx={{ width: '100%', display: 'flex', pt: 4, gap: '30%' }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={Object.keys(errors).length > 0}
              sx={{ backgroundColor: 'mediumaquamarine', color: 'black' }}
            >
              Update
            </Button>
            <Button
              type="reset"
              onClick={() => {
                console.log('reset');
              }}
              fullWidth
              variant="contained"
              sx={{ backgroundColor: 'beige', color: 'black' }}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
