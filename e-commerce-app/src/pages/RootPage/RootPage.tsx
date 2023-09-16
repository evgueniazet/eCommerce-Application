import { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import Container from '@mui/material/Container';
import { Box, Stack } from '@mui/material';

const RootPage = (): JSX.Element => {
  return (
    <Stack spacing={5} minHeight={'100vh'}>
      <Header />
      <Box flexGrow={1}>
        <Container maxWidth={'xl'}>
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </Stack>
  );
};
export default RootPage;
