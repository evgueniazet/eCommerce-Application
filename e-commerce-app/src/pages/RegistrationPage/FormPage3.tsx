import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


export const FormPage3 = () => {
    return (
        <Box
                component="form"
                noValidate
                sx={{ mt: 2 }}
              >
                <p>Address fields:</p>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="street"
                      name="street"
                      required
                      fullWidth
                      id="street"
                      label="Street"
                      autoFocus
                      size='small'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="city"
                      label="City"
                      name="city"
                      autoComplete="city"
                      size='small'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="postalCode"
                      label="Postal Code"
                      name="postalCode"
                      autoComplete="postal-code"
                      size='small'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="country"
                      label="Country"
                      id="password"
                      autoComplete="country"
                      size='small'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive web-site promotions"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, backgroundColor: 'green' }}
                >
                  Register
                </Button>
              </Box>
    );
};