import { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import Container from '@mui/material/Container';

const RootPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <Container maxWidth={'xl'}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};
export default RootPage;
