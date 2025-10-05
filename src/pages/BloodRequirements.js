import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Box,
    Chip
} from '@mui/material';
import {
    fetchBloodRequirements,
    createBloodRequirement
} from '../redux/slices/bloodRequirementsSlice';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const BloodRequirements = () => {
    const dispatch = useDispatch();
    const { requirements, isLoading } = useSelector((state) => state.bloodRequirements);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        recipientName: '',
        bloodGroup: '',
        unitsNeeded: '',
        hospitalName: '',
        contactNumber: '',
        urgency: 'normal'
    });

    useEffect(() => {
        dispatch(fetchBloodRequirements());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createBloodRequirement(formData));
        setOpen(false);
        setFormData({
            recipientName: '',
            bloodGroup: '',
            unitsNeeded: '',
            hospitalName: '',
            contactNumber: '',
            urgency: 'normal'
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" component="h1" color="primary">
                    Blood Requirements
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpen(true)}
                >
                    Post New Requirement
                </Button>
            </Box>

            <Grid container spacing={3}>
                {requirements.map((req) => (
                    <Grid item xs={12} md={6} key={req._id}>
                        <Card>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" mb={2}>
                                    <Typography variant="h6">
                                        Blood Group: {req.bloodGroup}
                                    </Typography>
                                    <Chip
                                        label={req.status}
                                        color={req.status === 'active' ? 'error' : 'success'}
                                    />
                                </Box>
                                <Typography variant="body1" gutterBottom>
                                    Recipient: {req.recipientName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Units Needed: {req.unitsNeeded}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Hospital: {req.hospitalName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Contact: {req.contactNumber}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Posted by: {req.postedBy?.name}
                                </Typography>
                                <Chip
                                    label={req.urgency}
                                    color={req.urgency === 'urgent' ? 'error' : 'info'}
                                    size="small"
                                    sx={{ mt: 1 }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Post New Blood Requirement</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Recipient Name"
                            name="recipientName"
                            value={formData.recipientName}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            select
                            label="Blood Group"
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                            required
                            margin="normal"
                        >
                            {bloodGroups.map((group) => (
                                <MenuItem key={group} value={group}>
                                    {group}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            label="Units Needed"
                            name="unitsNeeded"
                            type="number"
                            value={formData.unitsNeeded}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Hospital Name"
                            name="hospitalName"
                            value={formData.hospitalName}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Contact Number"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            select
                            label="Urgency"
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleChange}
                            margin="normal"
                        >
                            <MenuItem value="normal">Normal</MenuItem>
                            <MenuItem value="urgent">Urgent</MenuItem>
                        </TextField>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Post
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default BloodRequirements;