import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Grid,
    Avatar
} from '@mui/material';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        profilePic: user?.profilePic || ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Profile update logic will be implemented here
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                        <Avatar
                            src={user?.profilePic}
                            alt={user?.name}
                            sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
                        />
                        <Typography variant="h6" gutterBottom>
                            Role: {user?.role}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h5" gutterBottom color="primary">
                            Profile Information
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                value={user?.email}
                                margin="normal"
                                disabled
                            />
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Profile Picture URL"
                                name="profilePic"
                                value={formData.profilePic}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                            >
                                Update Profile
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Profile;