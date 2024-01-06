import { Box } from '@mui/material';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductsList.module.scss';
import { useAppSelector } from '../../store/hooks';
import { getProducts } from '../../store/slices/productsSlice';
import { FC } from 'react';
import { EmptyProducts } from './EmptyProducts';

export const ProductsList: FC = () => {
  const products = useAppSelector(getProducts);

  return (
    <Box className={styles.container}>
      {products.length > 0 ? (
        products.map((item) => <ProductCard item={item} key={item.id} />)
      ) : (
        <EmptyProducts />
      )}
    </Box>
  );
};
