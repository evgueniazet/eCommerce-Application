import { FC } from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export const BasketPage: FC = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <Container>
      <Typography variant="h2">Shopping cart</Typography>
    </Container>
  );
};
