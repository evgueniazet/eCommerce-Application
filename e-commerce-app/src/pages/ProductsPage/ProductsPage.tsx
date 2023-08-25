import React from 'react';
import './ProductsPage.scss';
import { Grid, Box, Typography, FormGroup, FormControlLabel, Stack, RadioGroup, Radio } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import ProductsPageImg from '../../assets/images/ProductsPageImg.png';
import { ProductsList } from '../../components/ProductsList/ProductsList';

export const ProductsPage: React.FC = () => {
  const [state, setState] = React.useState({
    category1: true,
    category2: false,
    category3: false,
  });

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { category1, category2, category3 } = state;

  const [value, setValue] = React.useState<number>(30);

  const handleChange2 = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Grid container sx={{ height: '80vh'}}>
      <Box className='left'>
        <Box>
          <Typography variant='h5'>
            Product Categories
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={category1} onChange={handleChange1} name="category1" />
              }
              label="Category 1"
            />
            <FormControlLabel
              control={
                <Checkbox checked={category2} onChange={handleChange1} name="category2" />
              }
              label="Category 2"
            />
            <FormControlLabel
              control={
                <Checkbox checked={category3} onChange={handleChange1} name="category3" />
              }
              label="Category 3"
            />
          </FormGroup>
        </Box>

        <Box>
          <Typography variant='h5'>
            Filter by price
          </Typography>
          <Box sx={{ width: 200 }}>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
              <p>0</p>
              <Slider aria-label="priceRange" value={value} min={0} max={1000} onChange={handleChange2} />
              <p>1000</p>
            </Stack>
          </Box>
        </Box>

        <Box>
          <Typography variant='h5'>
            Sort by
          </Typography>
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
      <Box className='right'>
        <img src={ ProductsPageImg } alt='img1' width='100%'/>
        <ProductsList/>
      </Box>
    </Grid>
  );
};
