import { FC } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button } from '@mui/material';
// import Grid from '@mui/material/Grid';
import EmptyBasket from '../../assets/images/BasketPageImg.png';

export const BasketPage: FC = () => {
  const navigate = useNavigate();
  return (
    <Container className="container" sx={{ textAlign: 'center', mt: '5%' }}>
      <Typography variant="h3" fontWeight="500" color="green">
        Shopping cart
      </Typography>
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
      <img src={EmptyBasket} alt="EmptyBasket" width={300} />
    </Container>
  );
};
