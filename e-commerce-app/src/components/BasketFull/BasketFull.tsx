import { JSX } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { lightGreen } from '@mui/material/colors';
import { useAppSelector } from '../../store/hooks';
import { getLineItemsInCart, selectCart } from '../../api/cartApi';
import BasketLineItem from '../BasketLineItem/BasketLineItem';
import { ICartApiResponse } from '../../types/slicesTypes/cart';
import CartClear from '../../requestsComponents/CartClear/CartClear';
import BasketDiscountForm from '../BasketDiscountForm/BasketDiscountForm';

const BasketFull = (): JSX.Element => {
  const navigate = useNavigate();
  const cartLineItems = useAppSelector(getLineItemsInCart);
  const cart = useAppSelector(selectCart) as ICartApiResponse;

  const totalCurrencyEUR = cart.totalPrice.currencyCode;

  const subTotalNumber = cart.lineItems.reduce((accum, item) => {
    return item.price.value.centAmount * item.quantity + accum;
  }, 0) / 10 ** cart.totalPrice.fractionDigits;
  const subTotalPriceEUR = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: totalCurrencyEUR,
  }).format(subTotalNumber);

  const totalNumberEUR = cart.totalPrice.centAmount / 10 ** cart.totalPrice.fractionDigits;
  const totalPriceEUR = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: totalCurrencyEUR,
  }).format(totalNumberEUR);

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 800,
        flexGrow: 1,
      }}
    >
      <Grid container className="titles" textAlign="start">
        <Grid item xs={7}>
          <Typography variant="h6">Product</Typography>
        </Grid>
        <Grid item xs={1.8}>
          <Typography variant="h6">Price</Typography>
        </Grid>
        <Grid item xs={2.2}>
          <Typography variant="h6">Quantity</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="h6">Total</Typography>
        </Grid>
      </Grid>
      <Divider />

      {cartLineItems &&
        cartLineItems.map((lineItem) => <BasketLineItem item={lineItem} key={lineItem.id} />)}

      <Divider />

      <Grid container justifyContent="space-between" mt="5%">
        <Grid item xs={12} md={2} mb={3}>
          <CartClear />
        </Grid>
        <Grid item xs={12} md={7}>
          <Grid container className="cart-checkout">
            <Grid className="subtotal" container fontWeight={700} fontSize="large">
              <Grid item xs={6} textAlign="left">
                Subtotal
              </Grid>
              <Grid item xs={6} textAlign="right">
                {subTotalPriceEUR}
              </Grid>
            </Grid>
            <Typography mt="3px" fontSize="small">
              Taxes and shipping calculated at checkout
            </Typography>

            <BasketDiscountForm />

            <Grid
              className="subtotal"
              container
              fontWeight={700}
              fontSize="20px"
              mt={3}
              color="green"
            >
              <Grid item xs={9} textAlign="left">
                EST. TOTAL:
              </Grid>
              <Grid item xs={3} textAlign="right">
                {totalPriceEUR}
              </Grid>
            </Grid>

            <Grid container mt={2}>
              <Grid item xs={12} mb={5}>
                <Button
                  sx={{ width: '100%', backgroundColor: lightGreen[100], mt: '5%' }}
                  variant="outlined"
                  color="success"
                >
                  Check out
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  className="continue-shopping"
                  sx={{ border: '1px solid grey', fontSize: '10px' }}
                  color="success"
                >
                  <KeyboardBackspaceIcon width="20" />
                  <Box component="span" onClick={() => navigate('/products')}>
                    Continue shopping
                  </Box>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default BasketFull;
