import React, { FormEvent } from 'react';
import { Grid, Box, Divider, InputBase, IconButton, Paper } from '@mui/material';
import ProductsPageImg from '../../assets/images/ProductsPageImg.png';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import SearchIcon from '@mui/icons-material/Search';
import styles from './ProductsPage.module.scss';
import ProductsFilterForm from '../../components/ProductsFilterForm/ProductsFilterForm';
import { useDispatch } from 'react-redux';
import { resetProducts } from '../../store/slices/productsSlice';
import { useSearchProductsMutation } from '../../api/productProjectionApi';

export const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const [searchProducts, {isSuccess, data}] = useSearchProductsMutation();
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(e.target);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container pt={2} alignItems={'center'}>
          <Grid item md={2} sx={{ display: { xs: 'none', md: 'block' } }}>
            <img className={styles.top__img} src={ProductsPageImg} alt="img1" width="100%" />
          </Grid>
          <Grid item sm={12} md={10} m={'auto'}>
            <Paper component="form" className={styles.top__form} onSubmit={submitHandler}>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search plant"
                inputProps={{ 'aria-label': 'search google maps' }}
              />
              <IconButton
                type="submit"
                sx={{ p: '10px', backgroundColor: 'lightgreen' }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <Divider sx={{ m: 0.5 }} orientation="vertical" />
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={3} className={styles.left}>
        <ProductsFilterForm />
      </Grid>

      <Grid item xs={12} md={9}>
        <Box className={styles.right}>
          <ProductsList />
        </Box>
      </Grid>
    </Grid>
  );
};
