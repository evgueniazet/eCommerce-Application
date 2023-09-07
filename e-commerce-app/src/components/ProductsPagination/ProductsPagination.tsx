import { Pagination } from '@mui/material';
import { JSX, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getProductsTotal } from '../../store/slices/productsSlice';
import { getQueryLimit, getQueryOffset, setQueryOffset } from '../../store/slices/queryParamsSlice';

const ProductsPagination = (): JSX.Element => {
  const totalProductsCount = useAppSelector(getProductsTotal);
  const queryLimit = useAppSelector(getQueryLimit);
  const queryOffset = useAppSelector(getQueryOffset);
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(queryOffset / queryLimit + 1);
  const [maxPages, setMaxPages] = useState(0);

  useEffect(() => {
    const totalPagesCount = Math.ceil(totalProductsCount / queryLimit);
    setMaxPages(totalPagesCount);
  }, [totalProductsCount]);

  useEffect(() => {
    const newOffset = (page - 1) * queryLimit;
    if (newOffset < totalProductsCount) {
      dispatch(setQueryOffset(newOffset));
    }
  }, [page]);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <Pagination count={maxPages}
                  variant="outlined"
                  shape="rounded"
                  showFirstButton
                  showLastButton
                  page={page}
                  onChange={handleChange}/>
    </Box>
  );
};
export default ProductsPagination;
