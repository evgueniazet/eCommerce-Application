import { FC } from 'react';
import styles from './ProductCard.module.scss';
import { Box, Typography, Button, CardMedia, CardContent, CardActions, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IProductApiResponse } from '../../types/slicesTypes/productsApiTypes';

interface ICardProps {
  item: IProductApiResponse;
}

export const ProductCard: FC<ICardProps> = ({ item }) => {
  const navigate = useNavigate();
  const handlerNavigation = () => {
    navigate(`/products/${item.id}`);
  };

  const imgPath = item.masterData.current.masterVariant.images[0].url;
  const imgDescription = item.masterData.current.name.en;

  const priceCommon = item.masterData.current.masterVariant.prices[0].value.centAmount / (10 * item.masterData.current.masterVariant.prices[0].value.fractionDigits);

  const priceSale = item.masterData.current.masterVariant.prices[1].value.centAmount / (10 * item.masterData.current.masterVariant.prices[1].value.fractionDigits);

  return (
    <Card className={styles.card}>
      <Box width={'100%'}>
        <CardMedia sx={{ height: 200, width: '100%' }}
                   image={imgPath}
                   title={imgDescription}/>
      </Box>
      <CardContent>
        <Typography component="h2">{item.masterData.current.name.en}</Typography>
        <Typography component="h3">{priceCommon}</Typography>
        <Typography component="h3">{priceSale}</Typography>
      </CardContent>
      <CardActions>
        <Button className={styles.card__button}
                onClick={handlerNavigation}
                variant="outlined">
          Read more
        </Button>
      </CardActions>
    </Card>
  );
};
