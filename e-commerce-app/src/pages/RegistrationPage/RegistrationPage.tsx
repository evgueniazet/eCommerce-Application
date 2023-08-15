import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import RegPageImg from '../../assets/images/RegPageImg.png';
import { auto } from '@popperjs/core';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
// import {FormPage1} from './FormPage1';
// import {FormPage2} from './FormPage2';
import {FormPage3} from './FormPage3';

export const RegistrationPage: React.FC = () => {
    
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5" sx={{ mb: 3, color: 'green', fontWeight: '900'}}>
                Welcome to Registration!
              </Typography>
              <img src={RegPageImg} alt='Image1' width={200} height={auto}  />
              <FormPage3/>
            </Box>
            <Grid sx={{mb: 5}} container justifyContent="center">
              <p>We don&apos;t share your personal information with anyone</p>
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Login
                    </Link>
                  </Grid>
                </Grid>
        </Container>
    );
};