import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Alert from '@mui/material/Alert';
import { UserData } from './UserData';
import { UserAddresses } from './UserAddresses';
import { UserPassword } from './UserPassword';
import { useValidate } from '../../hooks/useValidate';
import { IRegistrationFormData } from '../../interfaces/IRegistrationFormData';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { fieldNameType, globalErrors } from '../../types';
import { IValues } from '../../interfaces/IValues';
import { useAppSelector } from '../../store/hooks';
import {
  getMyCustomerFirstName,
  getMyCustomerLastName,
  getMyCustomerDateOfBirth,
  getMyCustomerEmail,
  getMyCustomerAddresses,
  getMyCustomerShippingAddressIds,
  getMyCustomerBillingAddressIds,
  getMyCustomerDefaultShippingAddressId,
  getMyCustomerDefaultBillingAddressId,
  getMyCustomerPassword,
  getMyCustomerVersion,
} from '../../store/slices/myCustomerSlice';
import { useUpdateMyCustomerMutation } from '../../api/myCustomerApi';
import { getAccessToken } from '../../store/slices/userSlice';
import { IUpdateMyCustomer } from '../../store/slices/updateMyCustomerTypes/updateMyCustomerTypes';
import { IMakeUpdateMyCustomerPersonalQueryObject } from '../../types/utilsTypes/IMakeUpdateMyCustomerPersonalQueryActions';
import { makeUpdateMyCustomerPersonalQueryActions } from '../../utils/updateMyCustomerUtils/makeUpdateMyCustomerPersonalQueryActions';

const steps = ['Personal information', 'Shipping/Billing address', 'Change password'];

export const UserPage: React.FC = () => {
  const firstName = useAppSelector(getMyCustomerFirstName);
  const lastName = useAppSelector(getMyCustomerLastName);
  const birthDate = useAppSelector(getMyCustomerDateOfBirth);
  const email = useAppSelector(getMyCustomerEmail);
  const addresses = useAppSelector(getMyCustomerAddresses);
  const shippingAddressId = useAppSelector(getMyCustomerShippingAddressIds);
  const billingAddressId = useAppSelector(getMyCustomerBillingAddressIds);
  const shippingDefaultAddressId = useAppSelector(getMyCustomerDefaultShippingAddressId);
  const billingDefaultAddressId = useAppSelector(getMyCustomerDefaultBillingAddressId);
  const password = useAppSelector(getMyCustomerPassword);
  const myCustomerVersion = useAppSelector(getMyCustomerVersion);

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const { errors: validationErrors, validateField } = useValidate();

  const accessToken = useAppSelector(getAccessToken) as string;
  const [updateMyCustomer] = useUpdateMyCustomerMutation();

  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setValue,
    setError,
    clearErrors,
    reset: resetForm,
  } = useForm<IRegistrationFormData>();

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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

  const onSubmit: SubmitHandler<IRegistrationFormData> = (data) => {
    if (Object.keys(globalErrors).length) {
      return;
    }

    const initialPersonalData: IMakeUpdateMyCustomerPersonalQueryObject = {
      firstName,
      lastName,
      email,
      birthDate,
    };

    console.log('data', data);

    const currentPersonalData: Partial<IMakeUpdateMyCustomerPersonalQueryObject> = {
      firstName: data.firstName || undefined,
      lastName: data.lastName || undefined,
      email: data.email || undefined,
      birthDate: data.birthDate || undefined,
    };

    const actionsArray = makeUpdateMyCustomerPersonalQueryActions(
      initialPersonalData,
      currentPersonalData,
    );

    const updateData: IUpdateMyCustomer = {
      version: myCustomerVersion,
      actions: actionsArray,
    };
    updateMyCustomer({
      token: accessToken,
      data: updateData,
    }).then((a) => {
      console.log(a);
    });
  };

  const buttonSubmitClick = () => {
    console.log('button submit click');
  };

  const userData = [firstName, lastName, birthDate, email];

  const userAddresses = [
    addresses,
    shippingAddressId,
    billingAddressId,
    shippingDefaultAddressId,
    billingDefaultAddressId,
  ];

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="wrapper"
          sx={{ mt: '20%' }}
        >
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <Box>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All pages completed - you&apos;re updated
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
                Profile Page {activeStep + 1}
              </Typography>
              <Box
                sx={{
                  marginTop: 8,
                  component: 'form',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              ></Box>
              {!!Object.keys(formState.errors).length && (
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <Alert style={{ width: '500px' }} severity={'error'}>
                    Please review and ensure all fields are correctly filled!
                  </Alert>
                </Box>
              )}
              {activeStep + 1 === 1 && (
                <UserData
                  register={register}
                  validationHandler={validationHandler}
                  errors={globalErrors}
                  userData={userData}
                  setValue={setValue}
                  getValues={getValues}
                />
              )}
              {activeStep + 1 === 2 && (
                <UserAddresses
                  register={register}
                  validationHandler={validationHandler}
                  errors={globalErrors}
                  userAddresses={userAddresses}
                  setValue={setValue}
                  getValues={getValues}
                />
              )}
              {activeStep + 1 === 3 && (
                <UserPassword
                  register={register}
                  validationHandler={validationHandler}
                  errors={globalErrors}
                  password={password}
                  setValue={setValue}
                  getValues={getValues}
                />
              )}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mt: 2 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Done' : 'Next'}
                </Button>
              </Box>
              <Box sx={{ width: '100%', display: 'flex', pt: 4, gap: '30%' }}>
                <Button
                  type="submit"
                  onClick={buttonSubmitClick}
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: 'mediumaquamarine', color: 'black' }}
                >
                  Update
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: 'beige', color: 'black' }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Grid>
  );
};
