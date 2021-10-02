import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import FiberNewOutlinedIcon from '@material-ui/icons/FiberNewOutlined';
import Masonry from '@mui/lab/Masonry';
import MasonryItem from '@mui/lab/MasonryItem';
// utils
import Alert from '../../Alert';
import TextEditor from "../../../utils/TextEditor";
import { newBlogPost } from '../../../actions/blogActions';
import routes from "../../../utils/RouteConstant";
// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

function CreateBlogPost(props) {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [images, setImges] = useState([]);
  const [alertObject, setAlertObject] = useState({ status: false, msg: '', key: '' });

  useEffect(() => {
    if (props.errors.unauthorized) {
      setAlertObject({
        status: true,
        msg: props.errors.unauthorized,
        key: Math.random(),
        type: 'error'
      });
    }
    if (props.errors.errors) {
      setErrors({ ...props.errors.errors });
    }
    if (props.auth.alert.key) {
      setAlertObject({
        ...props.auth.alert,
        status: true
      });
    }
  }, [props.errors, props.auth]);

  const updateAlertState = () => {
    setAlertObject({
      status: false,
      msg: ''
    });
  };

  const handleCancelForm = (e) => {
    navigate(routes.blogs);
  }

  const handleSubmitForm = (e) => {
    props.newBlogPost(blog, navigate);
  };

  const handleBlogInput = (target) => {
    setBlog({ ...blog, [target.id]: target.value });
  };

  const handleContentChange = (value) => {
      setBlog({...blog, content: value});
  }

  const handleProductImageDelete = (index) => {
    const temp = images;
    temp.splice(index, 1);
    setImges([...temp]);
  };

  return (
    <Container>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
        <FiberNewOutlinedIcon style={{ fontSize: 60 }} />
        <p style={{ fontSize: 30 }}>Blog Post</p>
      </Stack>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        style={{ marginTop: '5px' }}
      >
        <TextField
          id="title"
          label="Blog Title"
          variant="standard"
          fullWidth
          error={errors.title && true}
          helperText={errors.title}
          inputProps={{ style: { fontSize: 25 } }}
          InputLabelProps={{ style: { fontSize: 25 } }}
          onChange={(e) => {
            handleBlogInput(e.target);
          }}
        />
      </Stack>
      {/* {errors && errors.title && <div>{errors.title}</div>} */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <TextField
          id="description"
          label="Blog Description"
          variant="standard"
          fullWidth
          error={errors.title && true}
          helperText={errors.title}
          inputProps={{ style: { fontSize: 25 } }}
          InputLabelProps={{ style: { fontSize: 25 } }}
          onChange={(e) => {
            handleBlogInput(e.target);
          }}
        />
      </Stack>
      <br />
      <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4 }}>
        <p style={{ fontSize: 25 }}>Blog Image</p>
        <div component="label">
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            style={{ marginLeft: '15px' }}
            onClick={(e) => {
              document.getElementById('blog_images').click();
            }}
          >
            <AddIcon />
          </Fab>
          <input
            type="file"
            hidden
            multiple={false}
            accept="image/*"
            id="blog_images"
            onChange={(e) => {
              setImges([...e.target.files]);
            }}
          />
        </div>
      </Stack>
      <br />
      <Box>
        <Masonry columns={{ xs: 1, sm: 1, md: 1, lg: 1 }} spacing={1}>
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
                  style={{minWidth: "90%"}}
                  loading="lazy"
                />
              </div>
            </MasonryItem>
          ))}
        </Masonry>
      </Box>
      <TextEditor onChange={handleContentChange} value={blog.content} error={errors.content} />
      <center>
        <Button
          variant="contained"
          color="error"
          size="large"
          startIcon={<ClearRoundedIcon />}
          style={{ marginTop: 20,marginRight: 20 }}
          onClick={(e) => {
            handleCancelForm(e);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          size="large"
          endIcon={<SendIcon />}
          style={{ marginTop: 20 }}
          onClick={(e) => {
            handleSubmitForm(e);
          }}
        >
          Submit
        </Button>
      </center>
      {alertObject.status && (
        <Alert
          message={alertObject.msg}
          key={alertObject.key}
          update={updateAlertState}
          type={alertObject.type}
        />
      )}
    </Container>
  );
}

CreateBlogPost.propTypes = {
  newBlogPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProops = (state) => {
  const props = {
    errors: state.errors,
    auth: state.auth
  };
  return props;
};

export default connect(mapStateToProops, { newBlogPost })(CreateBlogPost);