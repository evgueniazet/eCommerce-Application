import { FC } from 'react';
import './ProductPage.scss';
import { Box } from '@mui/material';
import TestImg2 from '../../assets/images/TestImg-2.jpeg';

export const ProductPage: FC = () => {

  return (
    <Box className='product'>
      <Box className='left'>
        <Box className='smallImg'>
          <img src='' alt='img1' onClick={e=>setSelectedImg(0)}/>
          <img src={TestImg2} alt='img2' onClick={e=>setSelectedImg(1)}/>
        </Box>
        <Box className='bigImg'>
          <img src={smallImg[selectedImg]} alt=''/>
        </Box>
      </Box>

      <Box className='right'></Box>
    </Box>
  );
};
