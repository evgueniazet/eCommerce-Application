import { FC } from 'react';
import './ProductPage.scss';
import { Box } from '@mui/material';
import TestImg2 from '../../assets/images/TestImg-2.jpeg';

export const ProductPage: FC = () => {

  return (
    <Box className='product'>
      <Box className='left'>
        <Box className='smallImg'>
          <img src='' alt='img1' />
          <img src={TestImg2} alt='img2'/>
        </Box>
        <Box className='bigImg'>
          <img src='' alt=''/>
        </Box>
      </Box>

      <Box className='right'></Box>
    </Box>
  );
};
