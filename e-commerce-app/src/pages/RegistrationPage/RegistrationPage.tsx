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
import { useAppSelector } from '../../store/hooks';
import { getLoggedIn } from '../../store/slices/userSlice';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { IMyCustomerApiSignupRequest } from '../../types/slicesTypes/myCustomerApiSliceTypes';
import { IMyCustomerApiAddressRequest } from '../../types/addressesTypes';
import countryData from '../../data/countries.json';

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const from = '/';
  const isLoggedIn = useAppSelector(getLoggedIn);
  const isShippingChecked = false;
  const isBillingChecked = false;
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

  const [billingFlag, setBillingFlag] = useState(isBillingChecked);

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

  if (!shippingFlag && !billingFlag) {
    pageCount = 4;
  }

  let pagesToRender: number[];

  if (billingFlag && !shippingFlag) {
    pagesToRender = [1, 2, 4];
  } else if (shippingFlag && !billingFlag) {
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

  const getCountryCode = (countryName: string): string => {
    const country = countryData.find((c) => c.name === countryName);
    return country ? country.code : '';
  };

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

    if (!shippingFlag && !billingFlag) {
      transformedAddresses.push(shippingAddress);
      transformedAddresses.push(billingAddress);
    } else {
      if (shippingFlag) {
        transformedAddresses.push(shippingAddress);
        transformedAddresses.push(shippingAddress);
      }

      if (billingFlag) {
        transformedAddresses.push(billingAddress);
        transformedAddresses.push(billingAddress);
      }
    }

    const transformedData: IMyCustomerApiSignupRequest = {
      email: data.email || '',
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      password: data.password || '',
      dateOfBirth: data.birthDate || '',
      addresses: transformedAddresses,
      shippingAddresses: [],
      billingAddresses: [],
    };
  };

  const buttonSubmitClick = () => {
    setFormSubmitted(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          component: 'form',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3, color: 'green', fontWeight: '900' }}>
          Welcome to Registration!
        </Typography>
        <img src={RegPageImg} alt="Image1" width={200} height={auto} />
        <p>
          Page {page}/{pageCount}
        </p>
        {!!formSubmitted && !!Object.keys(formState.errors).length && (
          <Box>
            <Alert severity={'error'}>All fields are required!</Alert>
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
            />
          )}
          {pagesToRender.includes(4) && (
            <FormPage4
              isActive={page === (billingFlag ? 3 : 4)}
              register={register}
              errors={globalErrors}
              validationHandler={validationHandler}
              values={values}
              billingFlag={billingFlag}
              setBillingFlag={setBillingFlag}
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
            {page < (!shippingFlag && !billingFlag ? 4 : 3) && (
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
          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
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
      <Grid sx={{ mt: 2, mb: 5 }} container justifyContent="center">
        <Grid item>
          <Link href="#" variant="body2">
            Already have an account? Login
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};
