import { FC } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import BasketEmpty from '../../components/BasketEmpty/BasketEmpty';
import { useAppSelector } from '../../store/hooks';
import { getTotalQuantityLineItemsInCart } from '../../api/cartApi';
import BasketFull from '../../components/BasketFull/BasketFull';
import CartQuery from '../../requestsComponents/CartQuery/CartQuery';


export const BasketPage: FC = () => {

  const totalQuantity = useAppSelector(getTotalQuantityLineItemsInCart);
  return (
    <CartQuery>
      <Container className="container"
                 sx={{ textAlign: 'center', mt: '5%' }}>
        <Typography variant="h3"
                    fontWeight="500"
                    color="green"
                    mb={3}>
          Shopping cart
        </Typography>
        {totalQuantity ? <BasketFull/> : <BasketEmpty/>}
      </Container>
    </CartQuery>
  );
};
