import { FC } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import EmptyBasket from '../../assets/images/BasketPageImg.png';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import CartModifyQuantity from '../../requestsComponents/CartModifyQuantity/CartModifyQuantity';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export const BasketPage: FC = () => {
  const navigate = useNavigate();
  return (
    <Container className="container" sx={{ textAlign: 'center', mt: '5%' }}>
      <Typography variant="h3" fontWeight="500" color="green">
        Shopping cart
      </Typography>
      (
      <Box className="cart-empty">
        <Typography variant="h5" mt="5%">
          Your cart is empty
        </Typography>
        <Button
          className="start-shopping"
          sx={{ backgroundColor: 'yellowgreen', color: 'green', mt: '5%' }}
        >
          <KeyboardBackspaceIcon width="20" />
          <Box component="span" onClick={() => navigate('/products')}>
            Start shopping
          </Box>
        </Button>
      </Box>
      <img src={EmptyBasket} alt="EmptyBasket" width={300} />) : (
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
            <Typography>Product</Typography>
          </Grid>
          <Grid item xs={1.8}>
            <Typography>Price</Typography>
          </Grid>
          <Grid item xs={2.2}>
            <Typography>Quantity</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography>Total</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container className="cart-items" spacing={2} textAlign="start">
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src={EmptyBasket} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs={6} container direction="column" spacing={2} alignSelf="center">
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Product name
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Short description
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ cursor: 'pointer' }} variant="body2" color="text.secondary">
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item className="cart-product-price" xs={2} alignSelf="center">
              <Typography variant="subtitle1" component="div">
                19.00
              </Typography>
            </Grid>
            <Grid item className="cart-product-quantity" xs={2.8} alignSelf="center" display="flex">
              <CartModifyQuantity productId="we" />
            </Grid>
            <Grid item className="cart-product_total-price" xs={1.2} alignSelf="center">
              <Typography variant="subtitle1" component="div" fontWeight="700">
                19.00
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Box className="cart-summary" display="flex" justifyContent="space-between" mt="5%">
          <Button className="clear-cart" sx={{ height: '40px', border: '1px solid grey' }}>
            Clear Cart
          </Button>
          <Grid container xs={5} className="cart-checkout">
            <Grid className="subtotal" container fontWeight={700} fontSize="large">
              <Grid item xs={6} textAlign="left">
                Subtotal
              </Grid>
              <Grid item xs={6} textAlign="right">
                19.00
              </Grid>
            </Grid>
            <Typography mt="3px" fontSize="small">
              Taxes and shipping calculated at checkout
            </Typography>

            <Grid container mt={4} height={30}>
              <Grid item xs={9}>
                <TextField fullWidth size="small" label="Promo Code" />
              </Grid>
              <Grid item xs={3}>
                <Button sx={{ backgroundColor: 'beige', color: 'green' }}>Apply</Button>
              </Grid>
            </Grid>

            <Grid
              className="subtotal"
              container
              fontWeight={700}
              fontSize="20px"
              mt={3}
              color="green"
            >
              <Grid item xs={9} textAlign="left">
                Discounted Price
              </Grid>
              <Grid item xs={3} textAlign="right">
                19.00
              </Grid>
            </Grid>

            <Grid container mt={2}>
              <Grid item xs={12} mb={5}>
                <Button
                  sx={{ width: '100%', backgroundColor: 'yellowgreen', color: 'green', mt: '5%' }}
                >
                  Check out
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  className="continue-shopping"
                  sx={{ border: '1px solid grey', fontSize: '10px' }}
                >
                  <KeyboardBackspaceIcon width="20" />
                  <Box component="span" onClick={() => navigate('/products')}>
                    Continue shopping
                  </Box>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      )
    </Container>
  );
};
