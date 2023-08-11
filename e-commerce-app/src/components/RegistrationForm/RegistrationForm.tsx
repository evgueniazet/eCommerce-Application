import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useRegistrationForm } from '../../hooks/useRegistrationForm';

export const RegistrationForm = () => {
  const {
    email,
    password,
    repeatPassword,
    firstName,
    lastName,
    birthDate,
    streetAddress,
    houseNumber,
    city,
    postalCode,
    country,
    handleInputChange,
    handleSubmit,
  } = useRegistrationForm();

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        value={email}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Password"
        value={password}
        onChange={handleInputChange}
        type="password"
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <TextField
        label="Repeat Password"
        value={repeatPassword}
        onChange={handleInputChange}
        type="password"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="First Name"
        value={firstName}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Last Name"
        value={lastName}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Birthdate"
        value={birthDate}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Street Address"
        value={streetAddress}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="House Number"
        value={houseNumber}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="City"
        value={city}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Postal Code"
        value={postalCode}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Country"
        value={country}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Register
      </Button>
    </form>
  );
};

export default RegistrationForm;
