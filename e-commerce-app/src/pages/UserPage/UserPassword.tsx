import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { validateStrictPassword } from '../../validators/validatePassword';
import { validateConfirmPassword } from '../../validators/validateConfirmPassword';
import {
  IChangePasswordMyCustomer,
  IChangePasswordMyCustomerRequest,
} from '../../types/updateMyCustomerTypes/updateMyCustomerTypes';
import { useAppSelector } from '../../store/hooks';
import { getMyCustomerVersion } from '../../store/slices/myCustomerSlice';
import { getAccessToken, getUserEmail, setAuth } from '../../store/slices/userSlice';
import { useChangePasswordMyCustomerMutation } from '../../api/myCustomerApi';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../../api/authApi';
import { useLocalToken } from '../../hooks/useLocalToken';

interface IResetPasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const UserPassword = () => {
  const dispatch = useDispatch();
  const myCustomerVersion = useAppSelector(getMyCustomerVersion);
  const accessToken = useAppSelector(getAccessToken) as string;
  const [changeMyCustomerPassword] = useChangePasswordMyCustomerMutation();
  const [loginUser] = useLoginUserMutation();
  const myCustomerEmail = useAppSelector(getUserEmail) as string;

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const { delTokenFromStorage, setTokenInSessionStorage } = useLocalToken();

  const {
    handleSubmit,
    setError,
    clearErrors,
    reset,
    control,
    formState: { errors },
  } = useForm<IResetPasswordForm>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    mode: 'onChange',
  });

  const inputPasswordHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    target: 'currentPassword' | 'newPassword' | 'confirmNewPassword',
  ) => {
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
      setError(target, {
        type: 'required',
        message: errStr,
      });
    } else {
      clearErrors(target);
    }
  };

  const submitNewPasswordHandler: SubmitHandler<IResetPasswordForm> = () => {
    if (
      [
        validateStrictPassword(currentPassword),
        validateStrictPassword(newPassword),
        validateConfirmPassword(confirmNewPassword, newPassword),
      ].some((el) => el.length > 0)
    ) {
      return;
    }
    const passwordObject: IChangePasswordMyCustomer = {
      version: myCustomerVersion,
      currentPassword,
      newPassword,
    };
    const requestPasswordChangeObject: IChangePasswordMyCustomerRequest = {
      token: accessToken,
      data: passwordObject,
    };
    changeMyCustomerPassword(requestPasswordChangeObject)
      .then(() => {
        loginUser({ email: myCustomerEmail, password: newPassword })
          .unwrap()
          .then((result) => {
            if (result) {
              delTokenFromStorage();
              dispatch(
                setAuth({ access_token: result.access_token, refresh_token: result.refresh_token }),
              );
              setTokenInSessionStorage(result.refresh_token);
            }
          });
      })
      .catch((e) => console.log(e));
  };

  const onResetForm = () => {
    reset();
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit(submitNewPasswordHandler)} onReset={onResetForm}>
      <Grid container>
        <Grid item xs={12} mt={2}>
          <Controller
            render={({ fieldState, field: { onChange } }) => (
              <TextField
                fullWidth
                label="Current password"
                type="password"
                autoComplete="off"
                {...onChange}
                onChange={(e) => inputPasswordHandler(e, 'currentPassword')}
                value={currentPassword}
                error={!!fieldState.error}
                helperText={fieldState.error?.message || errors.currentPassword?.message}
              />
            )}
            name={'currentPassword'}
            control={control}
          />
        </Grid>

        <Grid item xs={12} mt={5}>
          <Controller
            render={({ fieldState, field: { onChange } }) => (
              <TextField
                fullWidth
                label="New password"
                type="password"
                autoComplete="off"
                {...onChange}
                onChange={(e) => inputPasswordHandler(e, 'newPassword')}
                value={newPassword}
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
            name={'newPassword'}
            control={control}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <Controller
            render={({ fieldState, field: { onChange } }) => (
              <TextField
                fullWidth
                label="Confirm password"
                type="password"
                autoComplete="off"
                {...onChange}
                onChange={(e) => inputPasswordHandler(e, 'confirmNewPassword')}
                value={confirmNewPassword}
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
            name={'confirmNewPassword'}
            control={control}
          />
        </Grid>

        <Grid item xs={12}>
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
