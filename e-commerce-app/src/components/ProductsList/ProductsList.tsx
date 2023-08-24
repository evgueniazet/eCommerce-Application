import { Box } from '@mui/material';
import React from 'react';
import TestImg from '../../assets/images/TestImg.jpeg';
import { Card } from '../Card/Card';

export const ProductsList: React.FC = () => {
    const data=[
        {
            id: 1,
            img: { TestImg },
            title: 'Product 1',
            isNew: true,
            oldPrice: 100,
            price: 80,
        },
        {
            id: 2,
            img: { TestImg },
            title: 'Product 2',
            isNew: true,
            oldPrice: 100,
            price: 80,
        },
        {
            id: 3,
            img: { TestImg },
            title: 'Product 3',
            isNew: true,
            oldPrice: 100,
            price: 80,
        },
    ];

    return (
        <Box>
            {data?.map(item=>(
                // не хватает item={item}
                <Card key={item.id}/>
            ))}
        </Box>
    );
};