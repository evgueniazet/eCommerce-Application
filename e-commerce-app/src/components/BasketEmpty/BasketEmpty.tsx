import { JSX } from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EmptyBasket from '../../assets/images/BasketPageImg.png';
import { useNavigate } from 'react-router-dom';
import { lightGreen } from '@mui/material/colors';

const BasketEmpty = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <>
      <Box className="cart-empty" data-testid="start-shopping-button">
        <Typography variant="h5" mt="5%">
          Your cart is empty
        </Typography>
        <Button
          className="start-shopping"
          variant="outlined"
          sx={{ backgroundColor: lightGreen[100], color: 'green', mt: '5%' }}
          color="success"
          onClick={() => navigate('/products')}
        >
          <KeyboardBackspaceIcon width="20" />
          <Box component="span">Start shopping</Box>
        </Button>
      </Box>
      <img src={EmptyBasket} alt="EmptyBasket" width={300} />
    </>
  );
};
export default BasketEmpty;
