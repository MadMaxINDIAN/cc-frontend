import * as Yup from 'yup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Typography
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { loginAdmin } from "../../../actions/authActions";

// ----------------------------------------------------------------------

function LoginForm(props) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [props.auth]);
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
    .min(8, "Password is too short")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Must satisfy all the conditions")
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: (data, actions) => {
      props.loginAdmin(data, navigate);
      actions.setSubmitting(false);
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
      <br />
      <Typography sx={{ color: 'text.secondary', fontSize: "medium", marginLeft: "auto", marginRight: "auto" }}><FiberManualRecordIcon color="success" style={{fontSize: 14}} /> Password should contain 1 capital letter.</Typography>
      <Typography sx={{ color: 'text.secondary', fontSize: "medium", marginLeft: "auto", marginRight: "auto" }}><FiberManualRecordIcon color="success" style={{fontSize: 14}} /> Password should contain 1 number.</Typography>
      <Typography sx={{ color: 'text.secondary', fontSize: "medium", marginLeft: "auto", marginRight: "auto" }}><FiberManualRecordIcon color="success" style={{fontSize: 14}} /> Password should contain 1 small letter.</Typography>
      <Typography sx={{ color: 'text.secondary', fontSize: "medium", marginLeft: "auto", marginRight: "auto" }}><FiberManualRecordIcon color="success" style={{fontSize: 14}} /> Password should contain 1 special character.</Typography>
    </FormikProvider>
  );
}

LoginForm.propTypes = {
  loginAdmin: PropTypes.func.isRequired,
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

export default connect(mapStateToProops, {loginAdmin})(LoginForm);
