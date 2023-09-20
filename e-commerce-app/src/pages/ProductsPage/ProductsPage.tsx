import React from 'react';
import { Grid, Box, Divider, InputBase, IconButton, Paper } from '@mui/material';
import ProductsPageImg from '../../assets/images/ProductsPageImg.png';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import SearchIcon from '@mui/icons-material/Search';
import styles from './ProductsPage.module.scss';
import ProductsFilterForm from '../../components/ProductsFilterForm/ProductsFilterForm';
import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISearchProductForm } from '../../types/searchProductsTypes/searchFormTypes';
import { getQueryText, setQueryText } from '../../store/slices/queryParamsSlice';
import { useAppSelector } from '../../store/hooks';
import ProductsPagination from '../../components/ProductsPagination/ProductsPagination';

export const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const searchQueryText = useAppSelector(getQueryText);
  const { register, handleSubmit } = useForm<ISearchProductForm>({
    defaultValues: {
      query: searchQueryText,
    },
  });
  const submitHandler: SubmitHandler<ISearchProductForm> = (data) => {
    dispatch(setQueryText(data.query || ''));
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container pt={2} alignItems={'center'}>
          <Grid item md={2} sx={{ display: { xs: 'none', md: 'block' } }}>
            <img className={styles.top__img} src={ProductsPageImg} alt="img1" width="100%" />
          </Grid>
          <Grid item sm={12} md={10} m={'auto'}>
            <Paper
              component="form"
              className={styles.top__form}
              onSubmit={handleSubmit(submitHandler)}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search plant"
                {...register('query', {})}
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
        <ProductsPagination />
      </Grid>
    </Grid>
  );
};
