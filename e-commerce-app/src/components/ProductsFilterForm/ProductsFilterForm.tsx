import React, { JSX } from 'react';
import {
  Box,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import { useAppSelector } from '../../store/hooks';
import { getAllCategories } from '../../store/slices/categoriesSlice';
import { useDispatch } from 'react-redux';

const ProductsFilterForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const categories = useAppSelector(getAllCategories);

  const [value, setValue] = React.useState<number>(30);

  const handleChange2 = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Box>
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

      <Box>
        <Typography variant="h5">Sort by</Typography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="lowPrice"
          name="radio-buttons-group"
        >
          <FormControlLabel value="lowPrice" control={<Radio />} label="Price (lowest first)" />
          <FormControlLabel value="highPrice" control={<Radio />} label="Price (highest first)" />
        </RadioGroup>
      </Box>
    </Box>
  );
};
export default ProductsFilterForm;
