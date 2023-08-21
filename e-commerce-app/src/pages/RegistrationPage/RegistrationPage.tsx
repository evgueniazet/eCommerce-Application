import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import RegPageImg from '../../assets/images/RegPageImg.png';
import { auto } from '@popperjs/core';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import { FormPage1 } from './FormPage1';
import { FormPage2 } from './FormPage2';
import { FormPage3 } from './FormPage3';
import { FormPage4 } from './FormPage4';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { IRegistrationFormData } from '../../interfaces/IRegistrationFormData';
import { useValidate } from '../../hooks/useValidate';
import { IValues } from '../../interfaces/IValues';
import { fieldNameType, globalErrors } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getAccessToken,
  getLoggedIn,
  getUserEmail,
  getUserPassword,
  setAuth,
  setLogIn
} from '../../store/slices/userSlice';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { IMyCustomerApiSignupRequest } from '../../types/slicesTypes/myCustomerApiSliceTypes';
import { IMyCustomerApiAddressRequest } from '../../types/addressesTypes';
import countryData from '../../data/countries.json';
import { useSignUpMyCustomerMutation } from '../../api/myCustomerApi';
import { useLoginUserMutation } from '../../api/authApi';
import { useLocalToken } from '../../hooks/useLocalToken';

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const from = '/';
  const isLoggedIn = useAppSelector(getLoggedIn);
  const isShippingChecked = false;
  let pageCount = 3;

  useEffect(() => {
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn]);

  const [page, setPage] = useState(1);

  const { register, handleSubmit, formState, getValues, setError, clearErrors } =
    useForm<IRegistrationFormData>();

  const { errors: validationErrors, validateField } = useValidate();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [shippingFlag, setShippingFlag] = useState(isShippingChecked);
  const [defaultShippingFlag, setDefaultShippingFlag] = useState(false);

  const [defaultBillingFlag, setDefaultBillingFlag] = useState(false);

  const globalErrors = Object.keys(validationErrors).reduce<globalErrors<IRegistrationFormData>>(
    (acc, item) => {
      if (validationErrors[item as keyof IRegistrationFormData]) {
        acc[item as keyof IRegistrationFormData] = {
          message: validationErrors[item as keyof IRegistrationFormData],
        };
      }

      if (
        formState.errors[item as keyof FieldErrors<IRegistrationFormData>] &&
        !validationErrors[item as keyof IRegistrationFormData]
      ) {
        acc[item as keyof IRegistrationFormData] = {
          message:
            formState.errors[item as keyof FieldErrors<IRegistrationFormData>]?.message ?? null,
        };
      }

      return acc;
    },
    {},
  );

  if (!shippingFlag) {
    pageCount = 4;
  }

  let pagesToRender: number[];

  if (shippingFlag) {
    pagesToRender = [1, 2, 3];
  } else {
    pagesToRender = [1, 2, 3, 4];
  }

  const values = {
    password: getValues('password') ?? '',
    confirmPassword: getValues('confirmPassword') ?? '',
    countryShipping: getValues('countryShipping') ?? '',
    countryBilling: getValues('countryBilling') ?? '',
  };

  const validationHandler = (fieldName: fieldNameType, value: string, values?: IValues): void => {
    if (!value) {
      const updatedErrors = {
        ...validationErrors,
        [fieldName]: '',
      };

      clearErrors(fieldName);
      Object.assign(validationErrors, updatedErrors);
      return;
    }

    const errString = validateField(fieldName, value, values);

    if (errString.length) {
      setError(fieldName, {
        type: 'required',
        message: errString,
      });
    } else {
      clearErrors(fieldName);
    }
  };

  const dispatch = useAppDispatch();
  const getCountryCode = (countryName: string): string => {
    const country = countryData.find((c) => c.name === countryName);
    return country ? country.code : '';
  };
  const [loginUser, {
    isSuccess: isSuccessLogin,
    error: errorLogin,
    isError: isErrorLogin,
    data: dataLogin
  }] = useLoginUserMutation();

  const [signupMyCustomer, {
    isSuccess: isSuccessRegistration,
    data: dataRegistration,
    isError: isErrorRegistration,
    error: ApiErrorRegistration
  }] = useSignUpMyCustomerMutation();
  const accessToken = useAppSelector(getAccessToken);

  const userPwd = useAppSelector(getUserPassword);
  const userEmail = useAppSelector(getUserEmail);

  useEffect(() => {
    if (!dataRegistration || !isSuccessRegistration) return;
    loginUser({
      email: userEmail || '',
      password: userPwd || '',
    });
  }, [isSuccessRegistration, dataRegistration]);

  useEffect(() => {
    if (isErrorLogin && errorLogin) {
      navigate(from, { replace: true });
    }
  }, [isErrorLogin, errorLogin]);

  const { setTokenInStorage } = useLocalToken();

  useEffect(() => {
    if (!isSuccessLogin || !dataLogin) return;
    console.log(dataLogin);
    dispatch(setAuth({ access_token: dataLogin.access_token, refresh_token: dataLogin.refresh_token }));
    dispatch(setLogIn());
    setTokenInStorage(dataLogin.refresh_token);
  }, [isSuccessLogin, dataLogin]);


  const onSubmit: SubmitHandler<IRegistrationFormData> = (data) => {
    const shippingAddress: IMyCustomerApiAddressRequest = {
      streetName: data.streetAddressShipping || '',
      postalCode: data.postalCodeShipping || '',
      city: data.cityShipping || '',
      country: getCountryCode(data.countryShipping || ''),
    };

    const billingAddress: IMyCustomerApiAddressRequest = {
      streetName: data.streetAddressBilling || '',
      postalCode: data.postalCodeBilling || '',
      city: data.cityBilling || '',
      country: getCountryCode(data.countryBilling || ''),
    };

    const transformedAddresses: IMyCustomerApiAddressRequest[] = [];

    const shippingAddressesArray = [0];
    const billingAddressesArray = [];

    if (shippingFlag) {
      transformedAddresses.push(shippingAddress);
      billingAddressesArray.push(0);
    } else {
      billingAddressesArray.push(1);
      transformedAddresses.push(shippingAddress);
      transformedAddresses.push(billingAddress);
    }


    const transformedData: IMyCustomerApiSignupRequest = {
      email: data.email || '',
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      password: data.password || '',
      dateOfBirth: data.birthDate || '',
      addresses: transformedAddresses,
      shippingAddresses: shippingAddressesArray,
      billingAddresses: billingAddressesArray,
    };

    if (defaultShippingFlag) {
      transformedData.defaultShippingAddress = 0;
    }
    if (defaultBillingFlag) {
      transformedData.defaultBillingAddress = 1;
    }

    dispatch(setAuth({ email: transformedData.email, password: transformedData.password }));

    signupMyCustomer({
      customerData: transformedData,
      token: accessToken || '',
    });
  };


  const buttonSubmitClick = () => {
    setFormSubmitted(true);
  };

  return (
    <Container component="main"
               maxWidth="xs">
      <CssBaseline/>
      <Box
        sx={{
          marginTop: 8,
          component: 'form',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1"
                    variant="h5"
                    sx={{ mb: 3, color: 'green', fontWeight: '900' }}>
          Welcome to Registration!
        </Typography>
        <img src={RegPageImg}
             alt="Image1"
             width={200}
             height={auto}/>
        <p>
          Page {page}/{pageCount}
        </p>
        {!!formSubmitted && !!Object.keys(formState.errors).length && (
          <Box>
            <Alert severity={'error'}>All fields are required!</Alert>
          </Box>
        )}
        {isErrorRegistration && ApiErrorRegistration && (
          <Box>
            <Alert severity={'error'}>Registration Failed Try Again Later!</Alert>
          </Box>
        )}
        {isErrorLogin && (
          <Box>
            <Alert severity={'error'}>Try to login later</Alert>
          </Box>
        )}
        {isSuccessRegistration && dataRegistration && (
          <Box>
            <Alert severity={'success'}>You have been registered</Alert>
          </Box>
        )}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ position: 'relative', mt: 2 }}
        >
          {pagesToRender.includes(1) && (
            <FormPage1
              isActive={page === 1}
              register={register}
              errors={globalErrors}
              validationHandler={validationHandler}
              values={values}
            />
          )}
          {pagesToRender.includes(2) && (
            <FormPage2
              isActive={page === 2}
              register={register}
              errors={globalErrors}
              validationHandler={validationHandler}
            />
          )}
          {pagesToRender.includes(3) && (
            <FormPage3
              isActive={page === 3}
              register={register}
              errors={globalErrors}
              validationHandler={validationHandler}
              values={values}
              shippingFlag={shippingFlag}
              setShippingFlag={setShippingFlag}
              checkDefault={defaultShippingFlag}
              setCheckDefault={setDefaultShippingFlag}
            />
          )}
          {pagesToRender.includes(4) && (
            <FormPage4
              isActive={page === 4}
              register={register}
              errors={globalErrors}
              validationHandler={validationHandler}
              values={values}
              checkDefault={defaultBillingFlag}
              setCheckDefault={setDefaultBillingFlag}
            />
          )}
          <Box textAlign="center">
            {page > 1 && (
              <Button
                size="small"
                variant="contained"
                sx={{ px: 4, mt: 2, backgroundColor: 'mediumaquamarine' }}
                onClick={() => {
                  const prevPage = page - 1;
                  setPage(prevPage);
                }}
              >
                Back
              </Button>
            )}
            {page < (shippingFlag ? 3 : 4) && (
              <Button
                size="small"
                variant="contained"
                sx={{ px: 4, mt: 2, mx: 4, backgroundColor: 'mediumaquamarine' }}
                onClick={() => {
                  const nextPage = page + 1;
                  setPage(nextPage);
                }}
              >
                Next
              </Button>
            )}
          </Box>
          <Grid item
                xs={12}
                sx={{ mt: 2 }}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails"
                                 color="primary"/>}
              label="I want to receive web-site promotions"
            />
          </Grid>
          <Button
            type="submit"
            onClick={buttonSubmitClick}
            fullWidth
            variant="contained"
            sx={{ backgroundColor: 'green' }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      <Box textAlign="center">
        <small>We don&apos;t share your personal information with anyone</small>
      </Box>
      <Grid sx={{ mt: 2, mb: 5, zIndex: 33, position: 'relative' }}
            container
            justifyContent="center">
        <Grid item>
          <Link href={'/login'}
                variant="body2">
            Already have an account? Login
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};
