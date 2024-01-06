import { FC } from 'react';
import styles from './ProductsList.module.scss';
import { Box } from '@mui/material';
import empty from '../../assets/images/EmptyCatalogPage.svg';

export const EmptyProducts: FC = () => {
  return (
    <Box className={styles.empty__products}>
      This is an empty product list. There are no products available!
      <img src={empty} alt="home-icon" className={styles.img} />
    </Box>
  );
};
