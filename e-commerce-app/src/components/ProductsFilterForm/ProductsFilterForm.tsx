import React, { JSX, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import Slider from '@mui/material/Slider';
import { useAppSelector } from '../../store/hooks';
import { getAllCategories } from '../../store/slices/categoriesSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISortByForm, SortFormType } from '../../types/searchProductsTypes/filterFormTypes';
import { useDispatch } from 'react-redux';
import {
  getQueryCategories,
  getQueryCentAmount,
  getQuerySort,
  setEmptySort,
  setQueryCategories,
  setQueryCentAmount,
  setQuerySort,
  setQueryText,
} from '../../store/slices/queryParamsSlice';

const minDistance = 10;
const ProductsFilterForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const searchQuerySort = useAppSelector(getQuerySort);
  const searchQueryCategories = useAppSelector(getQueryCategories);
  const categories = useAppSelector(getAllCategories);
  const centAmount = useAppSelector(getQueryCentAmount);

  const [priceSort, setPriceSort] = React.useState<number[]>(centAmount);
  const [sortRate, setSortRate] = useState<SortFormType>(searchQuerySort);
  const [sortCategories, setSortCategories] = useState(searchQueryCategories);

  const handleChange2 = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setPriceSort([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setPriceSort([clamped - minDistance, clamped]);
      }
    } else {
      setPriceSort(newValue as number[]);
    }
  };

  const { register, handleSubmit, reset } = useForm<ISortByForm>({
    defaultValues: {
      sort: sortRate,
    },
  });

  const submitFormHandler: SubmitHandler<ISortByForm> = (data) => {
    if (data.sort) {
      dispatch(setQuerySort(data.sort));
    }
    if (!(priceSort[0] === 0 && priceSort[1] === 100)) {
      dispatch(setQueryCentAmount(priceSort));
    }
    if (data.categories) {
      dispatch(setQueryCategories(data.categories));
    }
    if (!data.sort && priceSort[0] === 0 && priceSort[1] === 100 && !data.categories) {
      dispatch(setEmptySort());
    }
  };

  const clearSortHandler = () => {
    dispatch(setEmptySort());
    dispatch(setQueryText(''));
    reset();
    setSortRate('');
    setSortCategories('');
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit(submitFormHandler)}>
      <Stack spacing={3}>
        <FormControl fullWidth>
          <Typography variant="h5" mt="40px">
            Product Categories
          </Typography>
          <InputLabel id="queryCategories">Categories</InputLabel>
          <Select
            fullWidth
            labelId="queryCategories"
            id="selectCategories"
            label="Categories"
            value={sortCategories}
            {...register('categories', {
              onChange: (e) => setSortCategories(e.target.value),
            })}
          >
            <MenuItem value="" selected>
              <em>None</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem value={category.id} key={category.id}>
                {category.name.en}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box>
          <Typography variant="h5">Filter by price</Typography>
          <Box sx={{ width: 200 }}>
            <Stack spacing={2} direction="row" alignItems="center">
              <p>{priceSort[0]}</p>
              <Slider value={priceSort} onChange={handleChange2} min={0} max={100} />
              <p>{priceSort[1]}</p>
            </Stack>
          </Box>
        </Box>

        <FormControl fullWidth>
          <InputLabel id="sortBy">Sort By</InputLabel>
          <Select
            fullWidth
            labelId="sortBy"
            id="selectSortBy"
            label="Sort By"
            value={sortRate}
            {...register('sort', {
              onChange: (e) => setSortRate(e.target.value),
            })}
          >
            <MenuItem value="" selected>
              <em>None</em>
            </MenuItem>
            <MenuItem value="price asc">Price (Low first)</MenuItem>
            <MenuItem value="price desc">Price (High first)</MenuItem>
            <MenuItem value="name.en asc">Name (A first)</MenuItem>
            <MenuItem value="name.en desc">Name (Z first)</MenuItem>
          </Select>
        </FormControl>
        <Button type={'submit'} color="success" variant="contained">
          Sort
        </Button>
        <Button type={'button'} color="info" variant="outlined" onClick={clearSortHandler}>
          Clear Sort
        </Button>
      </Stack>
    </Box>
  );
};
export default ProductsFilterForm;
