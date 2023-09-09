import { FC } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import EmptyBasket from '../../assets/images/BasketPageImg.png';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';

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
          <Grid item xs={2}>
            <Typography>Price</Typography>
          </Grid>
          <Grid item xs={2}>
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
            <Grid item className="cart-product-quantity" xs={3} alignSelf="center" display="flex">
              <Button sx={{ backgroundColor: 'lightgrey' }}>-</Button>
              <Typography className="count">1</Typography>
              <Button sx={{ backgroundColor: 'lightgrey' }}>+</Button>
            </Grid>
            <Grid item className="cart-product_total-price" xs={1} alignSelf="center">
              <Typography variant="subtitle1" component="div">
                19.00
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      )
    </Container>
  );
};
