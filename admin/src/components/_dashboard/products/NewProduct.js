import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Container,
  TextField,
  Stack,
  Fab,
  Box,
  Card,
  Grid,
  CardHeader,
  CardContent,
  Typography,
  Button,
  colors
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import FiberNewOutlinedIcon from '@material-ui/icons/FiberNewOutlined';
import Masonry from '@mui/lab/Masonry';
import MasonryItem from '@mui/lab/MasonryItem';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';
// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

CreateProduct.propTypes = {
  product: PropTypes.object
};

export default function CreateProduct() {
  const [product, setProduct] = useState({
    title: '',
    category: '',
    description: ''
  });
  const [images, setImges] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  const addNewProductType = () => {
    setProductTypes([
      ...productTypes,
      {
        type: '',
        label: '',
        price: {
          original: 0,
          discount: 0,
          currency: 'INR - (Indian Rupee)'
        },
        sku: {
          stock: 0
        },
        dimensions: {
          width: 0,
          length: 0,
          height: 0,
          unit: 0
        }
      }
    ]);
  };

  const handleProductInput = (target) => {
    setProduct({ ...product, [target.id]: target.value });
  };

  const handleProductTypesInput = (target, index) => {
    const temp = productTypes;
    temp[index][target.id] = target.value;
    setProductTypes([...temp]);
  };

  const handlePriceInput = (target, index) => {
    const temp = productTypes;
    temp[index].price[target.id] = target.value;
    setProductTypes([...temp]);
  };

  const handleSKUInput = (target, index) => {
    const temp = productTypes;
    temp[index].sku[target.id] = target.value;
    setProductTypes([...temp]);
  };

  const handleDimensionsInput = (target, index) => {
    const temp = productTypes;
    temp[index].dimensions[target.id] = target.value;
    setProductTypes([...temp]);
  };

  const handleProductTypeDelete = (index) => {
    const temp = productTypes;
    temp.splice(index, 1);
    setProductTypes([...temp]);
  };

  const handleProductImageDelete = (index) => {
    const temp = images;
    temp.splice(index, 1);
    setImges([...temp]);
  };

  return (
    <Container>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
        <FiberNewOutlinedIcon style={{ fontSize: 60 }} />
        <p style={{ fontSize: 30 }}>Product Details</p>
      </Stack>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        style={{ marginTop: '5px' }}
      >
        <TextField
          id="title"
          label="Product Title"
          variant="standard"
          fullWidth
          inputProps={{ style: { fontSize: 25 } }}
          InputLabelProps={{ style: { fontSize: 25 } }}
          onChange={(e) => {
            handleProductInput(e.target);
          }}
        />
      </Stack>
      <br />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
        <TextField
          id="category"
          label="Category"
          variant="standard"
          fullWidth
          inputProps={{ style: { fontSize: 25 } }}
          InputLabelProps={{ style: { fontSize: 25 } }}
          onChange={(e) => {
            handleProductInput(e.target);
          }}
        />
      </Stack>
      <br />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
        <TextField
          id="description"
          label="Description"
          variant="standard"
          fullWidth
          inputProps={{ style: { fontSize: 25 } }}
          InputLabelProps={{ style: { fontSize: 25 } }}
          onChange={(e) => {
            handleProductInput(e.target);
          }}
        />
      </Stack>
      <br />
      <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4 }}>
        <p style={{ fontSize: 25 }}>Product Images</p>
        <div component="label">
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            style={{ marginLeft: '15px' }}
            onClick={(e) => {
              document.getElementById('product_images').click();
            }}
          >
            <AddIcon />
          </Fab>
          <input
            type="file"
            hidden
            multiple
            accept="image/*"
            id="product_images"
            onChange={(e) => {
              setImges([...images, ...e.target.files]);
            }}
          />
        </div>
      </Stack>
      <br />
      <Box>
        <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 6 }} spacing={1}>
          {images.map((item, index) => (
            <MasonryItem key={item.name}>
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 8
                }}
              >
                <Fab
                  size="medium"
                  style={{
                    position: 'absolute',
                    backgroundColor: '#f44336',
                    top: -8,
                    right: -8,
                    color: '#fff'
                  }}
                  aria-label="add"
                  onClick={(e) => {
                    handleProductImageDelete(index);
                  }}
                >
                  <DeleteRoundedIcon />
                </Fab>
                <img
                  src={`${URL.createObjectURL(item)}`}
                  srcSet={`${URL.createObjectURL(item)}`}
                  alt="Products"
                  loading="lazy"
                />
              </div>
            </MasonryItem>
          ))}
        </Masonry>
      </Box>
      <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4 }}>
        <p style={{ fontSize: 25 }}>Product Types</p>
        <div component="label">
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            style={{ marginLeft: '15px' }}
            onClick={(e) => {
              addNewProductType();
            }}
          >
            <AddIcon />
          </Fab>
        </div>
      </Stack>
      {productTypes.map((item, index) => (
        <Card
          sx={{ minWidth: 275 }}
          key={index}
          variant="outlined"
          style={{ marginTop: 10, position: 'relative' }}
        >
          <Fab
            size="medium"
            style={{
              position: 'absolute',
              backgroundColor: '#f44336',
              top: -5,
              right: -5,
              color: '#fff'
            }}
            onClick={(e) => {
              handleProductTypeDelete(index);
            }}
            aria-label="add"
          >
            <DeleteRoundedIcon />
          </Fab>
          <CardHeader
            title={<Typography variant="h4">Product type #{`${index + 1}`}</Typography>}
            subheader=""
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="type"
                  label="Type"
                  variant="standard"
                  value={productTypes[index].type}
                  fullWidth
                  onChange={(e) => {
                    handleProductTypesInput(e.target, index);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="label"
                  label="Label"
                  variant="standard"
                  value={productTypes[index].label}
                  fullWidth
                  onChange={(e) => {
                    handleProductTypesInput(e.target, index);
                  }}
                />
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">Price</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="currency"
                  label="Currency"
                  value={productTypes[index].price.currency}
                  variant="standard"
                  onChange={(e) => {
                    handlePriceInput(e.target, index);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="original"
                  type="number"
                  label="Original price (in ₹)"
                  value={productTypes[index].price.original}
                  variant="standard"
                  fullWidth
                  onChange={(e) => {
                    handlePriceInput(e.target, index);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="discount"
                  type="number"
                  label="Discount amount (in ₹)"
                  value={productTypes[index].price.discount}
                  variant="standard"
                  fullWidth
                  onChange={(e) => {
                    handlePriceInput(e.target, index);
                  }}
                />
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">SKU (Stock keeping unit)</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="stock"
                  type="number"
                  label="Stock"
                  value={productTypes[index].sku.stock}
                  placeholder="Units available to be sold"
                  variant="standard"
                  fullWidth
                  onChange={(e) => {
                    handleSKUInput(e.target, index);
                  }}
                />
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">Dimensions</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="height"
                  type="number"
                  label="Height (in cm)"
                  value={productTypes[index].dimensions.height}
                  variant="standard"
                  fullWidth
                  onChange={(e) => {
                    handleDimensionsInput(e.target, index);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="width"
                  type="number"
                  label="Width (in cm)"
                  value={productTypes[index].dimensions.width}
                  variant="standard"
                  fullWidth
                  onChange={(e) => {
                    handleDimensionsInput(e.target, index);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="length"
                  type="number"
                  label="Length (in cm)"
                  value={productTypes[index].dimensions.length}
                  variant="standard"
                  fullWidth
                  onChange={(e) => {
                    handleDimensionsInput(e.target, index);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="unit"
                  type="number"
                  label="Units"
                  placeholder="Units included in the box"
                  value={productTypes[index].dimensions.unit}
                  variant="standard"
                  fullWidth
                  onChange={(e) => {
                    handleDimensionsInput(e.target, index);
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
      <center>
        <Button
          variant="contained"
          color="success"
          size="large"
          endIcon={<SendIcon />}
          style={{ marginTop: 20 }}
          onClick={(e) => {
            const data = {
              ...product,
              product_types: productTypes
            };
          }}
        >
          Submit
        </Button>
      </center>
    </Container>
  );
}
