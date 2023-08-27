import {FC} from 'react';
import './Card.scss';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Product } from '../ProductsList/ProductsList';
import TestImg from '../../assets/images/TestImg.jpeg';
interface ICardProps {
    item: Product;
}

export const Card: FC<ICardProps> = ({item}) => {
    const navigate = useNavigate();
    const handlerNavigation =()=>{
        navigate('/product');
    };

    return (
            <Box className='card'>
                <Box>
                    <img src={TestImg} alt={item.title} className='image'/>
                </Box>
                <Typography component='h3'>{item.title}</Typography>
                <Box className='prices'>
                    <Typography component='h2'>{item.oldPrice}</Typography>
                    <Typography component='h2'>{item.price}</Typography>
                </Box>
                <Button onClick={handlerNavigation} variant="outlined">Read more</Button>
            </Box>
    );
};