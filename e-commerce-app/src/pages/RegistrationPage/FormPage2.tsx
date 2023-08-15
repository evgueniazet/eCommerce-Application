import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export const FormPage2 = () => {
    return (
        <Box
                component="form"
                noValidate
                sx={{ mt: 2 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="dateOfBirth"
                      type="date"
                      id="dateOfBirth"
                      label='Date of birth'
                      autoComplete="birth-day"
                    />
                  </Grid>
                </Grid>
              </Box>
    );
};