import React, { ChangeEvent, JSX, useState } from 'react';
import Box from '@mui/material/Box';
import { Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import countries from '../../data/countries.json';
import { useValidate } from '../../hooks/useValidate';
import { validatePostalCode } from '../../validators/validatePostalCode';
import { validateStrictCity } from '../../validators/validateCity';
import { IUpdateMyCustomerActionAddAddress } from '../../types/updateMyCustomerTypes/updateMyCustomerActionTypes';
import { useAppSelector } from '../../store/hooks';
import { getAccessToken } from '../../store/slices/userSlice';
import { useUpdateMyCustomerMutation } from '../../api/myCustomerApi';
import { IUpdateMyCustomer } from '../../types/updateMyCustomerTypes/updateMyCustomerTypes';
import { getMyCustomerVersion } from '../../store/slices/myCustomerSlice';

interface IAddAddressForm {
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

const UserPersonalAddAddress = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
    control,
  } = useForm<IAddAddressForm>({
    defaultValues: {
      postalCode: '',
      city: '',
      country: 'DE',
      street: '',
    },
    mode: 'onChange',
  });
  const accessToken = useAppSelector(getAccessToken) as string;
  const myCustomerVersion = useAppSelector(getMyCustomerVersion);
  const [updateMyCustomer] = useUpdateMyCustomerMutation();

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('DE');
  const [postalCode, setPostalCode] = useState('');

  const { validateField } = useValidate();

  const streetInputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    setStreet(val);

    const errString = validateField('validateStreet', val);
    if (errString.length) {
      setError('street', {
        type: 'required',
        message: errString,
      });
    } else {
      clearErrors('street');
    }
  };

  const cityInputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCity(val);

    const errString = validateStrictCity(val);

    if (errString.length) {
      setError('city', {
        type: 'required',
        message: errString,
      });
    } else {
      clearErrors('city');
    }
  };

  const postalCodeInputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    setPostalCode(val);

    const errString = validatePostalCode(
      val,
      countries.find((c) => c.code === country)?.name || '',
    );

    if (errString.length) {
      setError('postalCode', {
        message: errString,
      });
    } else {
      clearErrors(['postalCode']);
    }
  };

  const onResetForm = () => {
    reset();
    setStreet('');
    setCity('');
    setPostalCode('');
    setCountry('DE');
  };

  const submitForm: SubmitHandler<IAddAddressForm> = (data) => {
    const addressObject: IUpdateMyCustomerActionAddAddress = {
      action: 'addAddress',
      address: {
        streetName: data.street,
        city: data.city,
        country: data.country,
        postalCode: data.postalCode,
      },
    };
    const updateData: IUpdateMyCustomer = {
      version: myCustomerVersion,
      actions: [addressObject],
    };
    updateMyCustomer({ data: updateData, token: accessToken });
  };

  return (
    <Box component={'form'} noValidate onSubmit={handleSubmit(submitForm)} onReset={onResetForm}>
      <Box>
        <Grid container>
          <Grid item xs={12} mt={2}>
            <Controller
              control={control}
              name={'street'}
              render={({ fieldState, field: { onChange } }) => (
                <TextField
                  fullWidth
                  label="Street"
                  autoComplete="off"
                  {...onChange}
                  {...register('street', { required: 'Street is required' })}
                  onChange={(e) => streetInputHandler(e)}
                  value={street}
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} mt={2}>
            <Controller
              name={'city'}
              control={control}
              render={({ fieldState, field: { onChange } }) => (
                <TextField
                  fullWidth
                  label="City"
                  autoComplete="off"
                  {...onChange}
                  {...register('city', { required: 'City is required' })}
                  onChange={(e) => cityInputHandler(e)}
                  value={city}
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} mt={2}>
            <InputLabel>Country</InputLabel>
            <Select
              fullWidth
              label="Country"
              value={country || 'DE'}
              {...register('country', {
                required: 'Country is required',
                onChange: (e) => setCountry(e.target.value),
              })}
            >
              {countries.map((country) => (
                <MenuItem value={country.code} key={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Controller
              render={({ fieldState, field: { onChange } }) => (
                <TextField
                  fullWidth
                  {...onChange}
                  onChange={(e) => postalCodeInputHandler(e)}
                  label="Postal Code"
                  autoComplete="off"
                  value={postalCode}
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                />
              )}
              name={'postalCode'}
              control={control}
            />
          </Grid>
        </Grid>
      </Box>
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
          fullWidth
          variant="contained"
          sx={{ backgroundColor: 'beige', color: 'black' }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};
export default UserPersonalAddAddress;
