import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Link } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const onSubmit = (values) => {
    console.log('Login details', values);
    navigate('/home', { state: { loginData: values } });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: '#f5f5f5' }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fff',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Login
        </Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting, handleChange, values, errors, touched }) => (
            <Form>
              <Box mb={2}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Box>

              <Box mb={2}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ py: 1.5, fontWeight: 'bold' }}
              >
                {isSubmitting ? 'Logging In...' : 'Log In'}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography variant="body2" color="textSecondary" mt={3}>
          Don’t have an account?{' '}
          <Link href="/signup" color="primary">
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
