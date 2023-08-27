import { FC, useState } from 'react';
import './ProductPage.scss';
import { Box } from '@mui/material';
import TestImg1 from '../../assets/images/TestImg-1.png';
import TestImg2 from '../../assets/images/TestImg-2.jpeg';

export const ProductPage: FC = () => {
  const [selectedImg, setSelectedImg] = useState(0);

  const images=[
    TestImg1, TestImg2,
  ];

  return (
    <Box className='product'>
      <Box className='left'>
        <Box className='images'>
          <img src={images[0]} alt='img1' onClick={()=>setSelectedImg(0)} />
          <img src={images[1]} alt='img2' onClick={()=>setSelectedImg(1)}/>
        </Box>
        <Box className='bigImg'>
        <img src={images[selectedImg]} alt='' />
        </Box>
      </Box>

      <Box className='right'></Box>
    </Box>
  );
};
