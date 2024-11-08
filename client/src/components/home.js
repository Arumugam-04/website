import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, Paper, Avatar } from '@mui/material';

const Home = () => {
    const location = useLocation();
    const { loginData, signupData } = location.state || {};
    const image = signupData?.image ? URL.createObjectURL(signupData.image) : null;

    return (
        <Container maxWidth="sm" style={styles.container}>
            <Typography variant="h3" component="h1" style={styles.title}>
            </Typography>
            <Paper elevation={3} style={styles.details}>
                {loginData ? (
                    <>
                        <Typography variant="h5" component="h2" style={styles.subtitle}>
                            Login Details
                        </Typography>
                        <Typography variant="body1" style={styles.detailText}>
                            <strong>Email:</strong> {loginData.email}
                        </Typography>
                    </>
                ) : signupData ? (
                    <>
                        <Typography variant="h5" component="h2" style={styles.subtitle}>
                            Signup Details
                        </Typography>
                        {signupData?.image && (
                            <Box display="flex" justifyContent="center" mb={2}>
                                <Avatar src={image} alt="Profile" style={styles.avatar} />
                            </Box>
                        )}
                        <Typography variant="body1" style={styles.detailText}>
                            <strong>Name:</strong> {signupData.name}
                        </Typography>
                        <Typography variant="body1" style={styles.detailText}>
                            <strong>Email:</strong> {signupData.email}
                        </Typography>
                    </>
                ) : (
                    <Typography variant="body1" style={styles.detailText}>
                        No user data available.
                    </Typography>
                )}
            </Paper>
        </Container>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'white',
        padding: '20px',
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '20px',
        color: '#333',
        textAlign: 'center',
    },
    details: {
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
    },
    subtitle: {
        fontSize: '1.8rem',
        marginBottom: '10px',
        color: '#007BFF',
    },
    detailText: {
        fontSize: '1rem',
        color: '#555',
    },
    avatar: {
        width: '80px',
        height: '80px',
        objectFit: 'cover',
    },
};

export default Home;
