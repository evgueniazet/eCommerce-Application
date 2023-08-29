import { FC, useState } from 'react';
import './ProductPage.scss';
import { Box, Typography, ButtonGroup, Button } from '@mui/material';
import TestImg1 from '../../assets/images/TestImg-1.png';
import TestImg2 from '../../assets/images/TestImg-2.jpeg';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '36%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

const styleArrows = {
  display: 'flex',
  justifyContent: 'space-around',
};

export const ProductPage: FC = () => {
  const [selectedImg, setSelectedImg] = useState(0);

  const images = [TestImg1, TestImg2];

  const [count, setCount] = useState(1);

  // Modal window

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className="product">
      <Box className="left">
        <Box className="images">
          <img src={images[0]} alt="img1" onClick={() => setSelectedImg(0)} />
          <img src={images[1]} alt="img2" onClick={() => setSelectedImg(1)} />
        </Box>

        <Box className="bigImg" onClick={handleOpen}>
          <img src={images[selectedImg]} alt="img3" />
        </Box>
        <Modal open={open} onClose={handleClose} aria-discription="modal-image">
          <Box className="modal" sx={style}>
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
            <Box id="modal-image">
              <img src={images[selectedImg]} alt="img3" width="100%" />
              <Box className="slider" sx={styleArrows}>
                <IconButton>
                  <ArrowBackIos />
                  Prev
                </IconButton>
                <IconButton>
                  Next
                  <ArrowForwardIos />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>

      <Box className="right">
        <Typography variant="h2">Title</Typography>
        <Typography variant="h4" className="price">
          $100
        </Typography>
        <Typography variant="h6">
          product discription here Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Nesciunt modi quas error at delectus repudiandae ad voluptate dolorum ab quis quia vitae
          commodi mollitia, cupiditate, accusantium molestias impedit iste maxime.
        </Typography>

        <ButtonGroup className="quantity">
          <Button
            aria-label="reduce"
            onClick={() => {
              setCount(Math.max(count - 1, 0));
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>

          <Typography variant="h6">{count}</Typography>

          <Button
            aria-label="increase"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>

        <Box className="add-btn">
          <Button>
            <AddShoppingCartIcon />
            ADD TO CART
          </Button>
        </Box>

        <Box className="wish-btn">
          <Button>
            <FavoriteBorderIcon />
            ADD TO WISHLIST
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
