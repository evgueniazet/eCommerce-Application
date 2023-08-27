import { Box } from '@mui/material';
import React from 'react';
import TestImg from '../../assets/images/TestImg.jpeg';
import { Card } from '../Card/Card';
import './ProductsList.scss';

export type Product ={
    id: number,
    img: object,
    title: string,
    isNew: boolean,
    oldPrice: number,
    price: number
}

export const ProductsList: React.FC= () => {
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
        {
            id: 4,
            img: { TestImg },
            title: 'Product 4',
            isNew: true,
            oldPrice: 100,
            price: 80,
        },
    ];

    return (
        <Box className='cards-container'>
            {data?.map(item =>(
                <Card item={item} key={item.id}/>       
            ))},

        </Box>
    );
};