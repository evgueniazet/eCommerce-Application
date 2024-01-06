import { JSX } from 'react';
import { useAppSelector } from '../../store/hooks';
import { getTotalQuantityLineItemsInCart } from '../../api/cartApi';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const UserCart = (): JSX.Element => {
  const totalQuantity = useAppSelector(getTotalQuantityLineItemsInCart);
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate('/basket');
  };

  return (
    <IconButton aria-label="cart" onClick={clickHandler}>
      <Badge badgeContent={totalQuantity} color="success" invisible={!totalQuantity}>
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};
export default UserCart;
