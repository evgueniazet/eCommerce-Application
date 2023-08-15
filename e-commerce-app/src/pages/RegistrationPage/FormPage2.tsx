import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


export const FormPage2 = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
      };
    return (
        <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 5 }}
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
                      required
                      fullWidth
                      name="dateOfBirth"
                      label="Date of birth"
                      type="date"
                      id="dateOfBirth"
                      autoComplete="birth-day"
                    />
                  </Grid>
                </Grid>
                <Box textAlign='center'>
                    <Button type='submit' variant='contained' sx={{px:5, mt: 2, backgroundColor: 'green'}}>
                        Next
                    </Button>
                </Box>
              </Box>
    );
};