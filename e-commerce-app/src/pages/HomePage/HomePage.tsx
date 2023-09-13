import React from 'react';
import { useAppSelector } from '../../store/hooks';
import Container from '@mui/material/Container';
import styles from './HomePage.module.scss';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const HomePage: React.FC = () => {
  const { email } = useAppSelector((state) => state.user);
  return (
    <Container component="div" className={styles.homePage}>
      <Box className={styles.banner}>
        <Typography component="p" paragraph>
          Hello, {email ? email : 'Stranger. Can I call you a Friend?'}
        </Typography>
      </Box>
    </Container>
  );
};
