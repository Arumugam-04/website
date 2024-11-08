import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Link, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';

const Signup = () => {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        image: null,
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
        image: Yup.mixed().required('Image is required'),
    });

    const onSubmit = (values) => {
        console.log('Form data', values);
        navigate('/home', { state: { signupData: values } });
    };

    const handleImageChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        if (file) {
            setFieldValue("image", file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleImageDelete = (setFieldValue) => {
        setFieldValue("image", null);
        setImagePreview(null);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            minHeight="100vh"
            sx={{ backgroundColor: '#f5f5f5', p: 2 }}
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
                    Sign Up
                </Typography>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ setFieldValue, isSubmitting, values, errors, touched, handleChange }) => (
                        <Form>
                            <Box mb={2}>
                                <Field
                                    name="name"
                                    as={TextField}
                                    fullWidth
                                    label="Name"
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={<ErrorMessage name="name" />}
                                />
                            </Box>

                            <Box mb={2}>
                                <Field
                                    name="email"
                                    as={TextField}
                                    fullWidth
                                    label="Email"
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={<ErrorMessage name="email" />}
                                />
                            </Box>

                            <Box mb={2}>
                                <Field
                                    name="password"
                                    as={TextField}
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={<ErrorMessage name="password" />}
                                />
                            </Box>

                            <Box mb={2}>
                                <Field
                                    name="confirmPassword"
                                    as={TextField}
                                    fullWidth
                                    label="Confirm Password"
                                    type="password"
                                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                    helperText={<ErrorMessage name="confirmPassword" />}
                                />
                            </Box>
                            <Box mb={1} display="flex" flexDirection="column" alignItems="flex-start">
                                <Typography variant="body2" gutterBottom>
                                    Profile Image
                                </Typography>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="image-upload"
                                    type="file"
                                    onChange={(event) => handleImageChange(event, setFieldValue)}
                                />
                                <label htmlFor="image-upload">
                                    <IconButton
                                        color="primary"
                                        aria-label="upload picture"
                                        component="span"
                                    >
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                                {errors.image && touched.image && (
                                    <Typography variant="body2" color="error" mt={1}>
                                        {errors.image}
                                    </Typography>
                                )}
                                {imagePreview && (
                                    <Box mt={2} display="flex" flexDirection="column" alignItems="flex-start">
                                        <img
                                            src={imagePreview}
                                            alt="Selected"
                                            style={{ width: '100%', borderRadius: '4px' }}
                                        />
                                        <Button
                                            variant="contained"
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleImageDelete(setFieldValue)}
                                            sx={{ mt: 1 }}
                                        >
                                            Remove Image
                                        </Button>
                                    </Box>
                                )}
                            </Box>


                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                sx={{ py: 1.5, fontWeight: 'bold', mt: 2 }}
                            >
                                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                            </Button>
                        </Form>
                    )}
                </Formik>
                <Typography variant="body2" color="textSecondary" mt={3}>
                    Already have an account?{' '}
                    <Link href="/signin" color="primary">
                        Sign in
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Signup;
