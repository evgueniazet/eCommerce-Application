import React, { JSX, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import { useAppSelector } from '../../store/hooks';
import { getAllCategories } from '../../store/slices/categoriesSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISortByForm, SortFormType } from '../../types/searchProductsTypes/filterFormTypes';
import { useDispatch } from 'react-redux';
import { getQuerySort, setEmptySort, setQuerySort } from '../../store/slices/queryParamsSlice';

const ProductsFilterForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const searchQuerySort = useAppSelector(getQuerySort);
  const categories = useAppSelector(getAllCategories);

  const [value, setValue] = React.useState<number>(30);
  const [sortRate, setSortRate] = useState<SortFormType>(searchQuerySort);

  const handleChange2 = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const { register, handleSubmit } = useForm<ISortByForm>({
    defaultValues: {
      sort: sortRate,
    },
  });

  const submitFormHandler: SubmitHandler<ISortByForm> = (data) => {
    if (data.sort) {
      dispatch(setQuerySort(data.sort));
    } else {
      dispatch(setEmptySort());
    }
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit(submitFormHandler)}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h5" mt="40px">
            Product Categories
          </Typography>
          <FormGroup>
            {categories.map((category) => (
              <FormControlLabel
                key={category.id}
                control={<Checkbox value={category.id} name={category.name.en} />}
                label={category.name.en}
              />
            ))}
          </FormGroup>
        </Box>

        <Box>
          <Typography variant="h5">Filter by price</Typography>
          <Box sx={{ width: 200 }}>
            <Stack spacing={2} direction="row" alignItems="center">
              <p>0</p>
              <Slider
                aria-label="priceRange"
                value={value}
                min={0}
                max={1000}
                onChange={handleChange2}
              />
              <p>1000</p>
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
      </Stack>
    </Box>
  );
};
export default ProductsFilterForm;
