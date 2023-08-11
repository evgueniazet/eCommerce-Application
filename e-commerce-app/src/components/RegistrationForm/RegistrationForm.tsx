import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const RegistrationForm = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRepeatPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(event.target.value);
  };

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleBirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(event.target.value);
  };

  const handleStreetAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreetAddress(event.target.value);
  };

  const handleHouseNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHouseNumber(event.target.value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handlePostalCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostalCode(event.target.value);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        value={email}
        onChange={handleEmailChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Password"
        value={password}
        onChange={handlePasswordChange}
        type="password"
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <TextField
        label="Repeat Password"
        value={repeatPassword}
        onChange={handleRepeatPassword}
        type="password"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="First Name"
        value={firstName}
        onChange={handleFirstNameChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Last Name"
        value={lastName}
        onChange={handleLastNameChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Birthdate"
        value={birthDate}
        onChange={handleBirthDateChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Street Address"
        value={streetAddress}
        onChange={handleStreetAddressChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="House Number"
        value={houseNumber}
        onChange={handleHouseNumberChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="City"
        value={city}
        onChange={handleCityChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Postal Code"
        value={postalCode}
        onChange={handlePostalCodeChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Country"
        value={country}
        onChange={handleCountryChange}
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
