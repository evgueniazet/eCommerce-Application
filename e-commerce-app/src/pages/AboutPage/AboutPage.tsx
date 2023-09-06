import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export const AboutPage: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography component="h4" variant="h2" align="center" color="green" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          We&apos;re on a mission to complete <br /> eCommerce Application successfully.
        </Typography>
        <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
          <Button variant="contained">Join RS School</Button>
          <Button variant="outlined">Our mentor</Button>
        </Stack>
      </Container>
    </Box>
  );
};
