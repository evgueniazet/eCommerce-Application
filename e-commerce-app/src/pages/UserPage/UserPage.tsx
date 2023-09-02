import React, { useState } from 'react';
import './UserPage.module.scss';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { UserData } from './UserData';
import { UserAdresses } from './UserAdresses';
import { UserPassword } from './UserPassword';

const steps = ['Personal information', 'Shipping/Billing address', 'Change password'];

export const UserPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

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

  console.log('activeStep', activeStep + 1);

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box className="wrapper" sx={{ mt: '20%' }}>
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
              {activeStep + 1 === 1 && <UserData />}
              {activeStep + 1 === 2 && <UserAdresses />}
              {activeStep + 1 === 3 && <UserPassword />}
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
