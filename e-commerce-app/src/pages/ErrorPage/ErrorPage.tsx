import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import notFound from '../../assets/images/ImgErrorPage.png';
import gifIcon from '../../assets/gif/animation_llh1f76d_small.gif';
import { Link } from 'react-router-dom';

export const ErrorPage: React.FC = () => {
    return (
        <Box sx={{ 
          backgroundImage: `url(${notFound})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '80vh',
          marginBottom: '3%'
        }}
        >
            <Typography variant="h5" style={{ color: 'darkgreen' }}>
                Sorry, the page you’re looking for doesn’t exist.
            </Typography>
            <img src={gifIcon} alt='home-icon' width={45} height={45}/>
            <Button variant="contained" sx={{ backgroundColor:'lightgreen', height:'fit-content'}}>
                <Link to='/'>Back Home</Link>
            </Button>
        </Box>
    );
};
