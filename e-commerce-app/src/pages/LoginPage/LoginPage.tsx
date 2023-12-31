import {
  Grid,
  Box,
  TextField,
  Button,
  Alert,
  Typography,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import LoginImage from '../../assets/images/ImgLoginPage.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { FC, useEffect, useId, useState } from 'react';
import { useValidate } from '../../hooks/useValidate';
import { SubmitHandler, useForm } from 'react-hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useLoginUserMutation } from '../../api/authApi';
import {
  getAccessToken,
  getLoggedIn,
  isRememberedMe,
  setAuth,
  setLogIn,
  setLogOut,
  toggleRememberMe,
} from '../../store/slices/userSlice';
import { IResponseError } from '../../types/AuthTypes';
import { ILoginFormData } from '../../interfaces/ILoginFormData';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useLocalToken } from '../../hooks/useLocalToken';
import { useAuthenticateMyCustomerMutation } from '../../api/myCustomerApi';
import { IAuthenticateMyCustomer } from '../../types/slicesTypes/myCustomerApiSliceTypes';

const defaultFormState: ILoginFormData = {
  email: '',
  password: '',
  rememberMe: false,
};

type fieldNameType = 'email' | 'password' | `root.${string}` | 'root';

interface IGlobalError {
  status: boolean;
  message: string;
}

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const from = '/';

  const accessToken = useAppSelector(getAccessToken) as string;
  const isLoggedIn = useAppSelector(getLoggedIn);
  const isRememberedUser = useAppSelector(isRememberedMe);

  useEffect(() => {
    if (isLoggedIn) {
      reset();
      navigate(from, { replace: true });
    }
  }, [isLoggedIn]);

  const { validateField } = useValidate();
  const { setTokenInStorage, setTokenInSessionStorage } = useLocalToken();
  const dispatch = useAppDispatch();

  const [globalError, setGlobalError] = useState<IGlobalError>({
    status: false,
    message: '',
  });

  const [loginUser, { isSuccess, error: errorApi, isError, data }] = useLoginUserMutation();
  const [authenticateUser] = useAuthenticateMyCustomerMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
    clearErrors,
  } = useForm<ILoginFormData>({
    defaultValues: {
      ...defaultFormState,
    },
  });

  useEffect(() => {
    if (!isSuccess || !data) return;
    dispatch(setAuth({ access_token: data.access_token, refresh_token: data.refresh_token }));
    setTokenInSessionStorage(data.refresh_token);
    if (isRememberedUser) {
      setTokenInStorage(data.refresh_token);
    }
    dispatch(setLogIn());
  }, [isSuccess, data]);

  useEffect(() => {
    if (!isError || !errorApi) return;
    setGlobalError({ status: true, message: (errorApi as IResponseError).data.message });
    dispatch(setLogOut());
  }, [isError]);

  const loginFormId = useId();

  const submitHandler: SubmitHandler<ILoginFormData> = (data) => {
    if (data.email) {
      const errStr = validateField('email', data.email);
      if (errStr) {
        setError('email', { type: 'validate', message: errStr });
        setGlobalError({
          status: true,
          message: errStr,
        });
        return;
      }
      clearErrors('email');
      setGlobalError({
        status: false,
        message: '',
      });
    }

    if (data.password) {
      const errStr = validateField('password', data.password);
      if (errStr) {
        setError('password', { type: 'validate', message: errStr });
        setGlobalError({
          status: true,
          message: errStr,
        });
        return;
      }
      clearErrors('password');
      setGlobalError({
        status: false,
        message: '',
      });
    }

    if (errors.password || errors.email) {
      setGlobalError({
        status: true,
        message: errors.password?.message || errors.email?.message || 'Error. Try Again Later',
      });
      return;
    }
    if (data.email && data.password) {
      dispatch(toggleRememberMe(!!data.rememberMe));
      setGlobalError({
        status: false,
        message: '',
      });
      dispatch(
        setAuth({
          email: data.email,
          password: data.password,
        }),
      );
      try {
        const authObj: IAuthenticateMyCustomer = {
          token: accessToken,
          customerData: {
            email: data.email,
            password: data.password,
          },
        };
        authenticateUser(authObj).then(() =>
          loginUser({ email: data.email, password: data.password }),
        );
      } catch {
        console.log('er');
      }
    } else {
      setGlobalError({
        status: true,
        message: 'All fields are required',
      });
    }
  };

  const validationHandler = (fieldName: fieldNameType, value: string): void => {
    if (!value) {
      clearErrors(fieldName);
      return;
    }
    const errString = validateField(fieldName, value);

    if (errString.length) {
      setError(fieldName, {
        type: 'required',
        message: errString,
      });
    } else {
      clearErrors(fieldName);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Grid container sx={{ height: '80vh' }}>
      <Grid
        item
        lg={7}
        sm={5}
        sx={{
          backgroundImage: `url(${LoginImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'top',
        }}
      ></Grid>
      <Grid item lg={5} sm={7}>
        <Box
          component="form"
          noValidate
          sx={{ mt: 5, ml: 8, mr: 8 }}
          id={loginFormId}
          onSubmit={handleSubmit(submitHandler)}
        >
          {globalError.status && (
            <Box>
              <Alert severity={'error'}>{globalError.message}</Alert>
            </Box>
          )}
          <TextField
            sx={{ mt: 2 }}
            fullWidth
            id={`email-${loginFormId}`}
            label="Email Address"
            type="email"
            autoComplete="off"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              onChange: (e) => validationHandler('email', e.target.value),
            })}
          />
          <TextField
            fullWidth
            margin="normal"
            id={`password-${loginFormId}`}
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="off"
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {showPassword ? (
                    <IconButton onClick={() => setShowPassword(false)}>
                      <VisibilityIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => setShowPassword(true)}>
                      <VisibilityOffIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            {...register('password', {
              required: 'Password is required',
              onChange: (e) => validationHandler('password', e.target.value),
            })}
          />
          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              sx={{ px: 5, mt: 2, backgroundColor: 'green' }}
            >
              Login
            </Button>
            <Box py={2}>
              <FormControlLabel
                control={<Checkbox {...register('rememberMe')} />}
                label={'Remember me'}
              />
            </Box>
          </Box>
          <Box>
            <NavLink to="/">Forgot Password?</NavLink>
          </Box>
          <Box sx={{ mt: 10 }}>
            <Typography component="p" textAlign="center">
              Don&apos;t have account yet?
            </Typography>
          </Box>
          <Box textAlign="center">
            <Button
              onClick={() => navigate('/registration')}
              variant="contained"
              sx={{ px: 2, mt: 2, backgroundColor: 'green' }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
