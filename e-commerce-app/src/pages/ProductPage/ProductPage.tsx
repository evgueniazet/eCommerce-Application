import { FC, useEffect, useState } from 'react';
import styles from './ProductPage.module.scss';
import { Box, Typography, ButtonGroup, Button, Grid, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useGetProductByIdQuery } from '../../api/productsApi';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { getAccessToken } from '../../store/slices/userSlice';
import LoadingProgress from '../../components/LoadingProgress/LoadingProgress';
import { getTaxes } from '../../store/slices/taxesSlice';
import { ITaxApiResponse } from '../../types/slicesTypes/taxApiTypes';

const style = {
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const styleArrows = {
  display: 'flex',
  justifyContent: 'space-around',
};

export const ProductPage: FC = () => {
  const { productId } = useParams();
  const authToken = useAppSelector(getAccessToken);
  const taxesArray = useAppSelector(getTaxes);

  const { data, isSuccess, isLoading, isFetching } = useGetProductByIdQuery({
    productId: productId as string,
    token: authToken as string,
  });

  const [tax, setTax] = useState(0);

  useEffect(() => {
    if (isSuccess) {
      taxesArray
        .filter((item) => item.id === data.taxCategory.id)
        .flatMap((elem) => elem.rates)
        .filter((rate: ITaxApiResponse) => rate.country === 'DE')
        .forEach((rate: ITaxApiResponse) => {
          setTax(rate.amount);
        });
    }
  }, [isSuccess]);

  const [selectedImg, setSelectedImg] = useState(0);

  const [count, setCount] = useState(1);

  // Modal window

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (isLoading || isFetching || !data) {
    return <LoadingProgress />;
  }

  const images = data.masterData.current.masterVariant.images.map((img) => img.url);
  const title = data.masterData.current.name.en;
  const description = data.masterData.current.metaDescription.en;

  const currencyCommon = data.masterData.current.masterVariant.prices[0].value.currencyCode;
  const priceNumber =
    data.masterData.current.masterVariant.prices[0].value.centAmount /
    10 ** data.masterData.current.masterVariant.prices[0].value.fractionDigits;
  const priceCommon = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCommon,
  }).format(priceNumber);

  const discountPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCommon,
  }).format(priceNumber - priceNumber * tax);

  return (
    <Grid container px={5} py={7} spacing={2} alignItems={'center'}>
      <Grid item xs={12} md={6}>
        <Grid container spacing={3} alignItems={'center'}>
          <Grid item xs={3}>
            <Stack spacing={2}>
              {images.map((item, idx) => (
                <img
                  key={item}
                  src={item}
                  alt={title}
                  loading="lazy"
                  className={styles.img_small}
                  onClick={() => setSelectedImg(idx)}
                />
              ))}
            </Stack>
          </Grid>

          <Grid item xs={9} onClick={handleOpen}>
            <img className={styles.img_big} src={images[selectedImg]} alt="img3" />
          </Grid>

          <Modal open={open} onClose={handleClose} aria-description="modalImage">
            <Box className={styles.modal} sx={style}>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 3,
                  top: 3,
                  color: 'green',
                }}
              >
                <CloseIcon />
              </IconButton>
              <Box id="modalImage">
                <img
                  className={styles.modal__img}
                  src={images[selectedImg]}
                  alt="img3"
                  width="100%"
                />
              </Box>
              <Box className="slider" sx={styleArrows}>
                <IconButton
                  onClick={() =>
                    selectedImg === 0
                      ? setSelectedImg(0)
                      : setSelectedImg((prevState) => prevState - 1)
                  }
                  disabled={selectedImg === 0}
                >
                  <ArrowBackIos />
                  Prev
                </IconButton>
                <IconButton
                  onClick={() =>
                    selectedImg === images.length - 1
                      ? setSelectedImg((prevState) => prevState)
                      : setSelectedImg((prevState) => prevState + 1)
                  }
                  disabled={selectedImg === images.length - 1}
                >
                  Next
                  <ArrowForwardIos />
                </IconButton>
              </Box>
            </Box>
          </Modal>
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <Stack spacing={4} className="right">
          <Typography variant="h2">{title}</Typography>

          {tax !== 0 ? (
            <>
              <Typography variant="h4" className={styles.price}>
                Discount price:{discountPrice}
              </Typography>
              <Typography variant="h5" className={styles.price_full}>
                Full price:{priceCommon}
              </Typography>
              <Typography variant="h6" className={styles.price}>
                Tax: {`${tax * 100} %`}
              </Typography>
            </>
          ) : (
            <Typography variant="h4" className={styles.price}>
              Price:{priceCommon}
            </Typography>
          )}
          <Typography variant="h6" align={'justify'}>
            {description}
          </Typography>

          <ButtonGroup className={styles.quantity}>
            <Button
              className={styles.quantity__btn}
              aria-label="reduce"
              onClick={() => {
                setCount(Math.max(count - 1, 0));
              }}
            >
              <RemoveIcon fontSize="small" />
            </Button>

            <Typography variant="h6">{count}</Typography>

            <Button
              className={styles.quantity__btn}
              aria-label="increase"
              onClick={() => {
                setCount(count + 1);
              }}
            >
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>

          <Box className={styles.btn}>
            <Button>
              <AddShoppingCartIcon />
              ADD TO CART
            </Button>
          </Box>

          <Box className={styles.btn}>
            <Button>
              <FavoriteBorderIcon />
              ADD TO WISHLIST
            </Button>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};
