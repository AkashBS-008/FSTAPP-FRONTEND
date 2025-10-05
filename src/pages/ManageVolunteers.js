import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    Alert,
    CircularProgress
} from '@mui/material';
import {
    fetchVolunteers,
    createVolunteer,
    updateVolunteer,
    deleteVolunteer
} from '../redux/slices/volunteersSlice';

const initialFormData = {
    name: '',
    email: '',
    password: '',
    phone: ''
};

const ManageVolunteers = () => {
    const dispatch = useDispatch();
    const { volunteers, isLoading, error } = useSelector((state) => state.volunteers);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        dispatch(fetchVolunteers());
    }, [dispatch]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode && selectedVolunteer) {
                await dispatch(updateVolunteer({ 
                    id: selectedVolunteer._id, 
                    data: formData 
                })).unwrap();
            } else {
                await dispatch(createVolunteer(formData)).unwrap();
            }
            handleClose();
        } catch (err) {
            console.error('Failed to save volunteer:', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this volunteer?')) {
            try {
                await dispatch(deleteVolunteer(id)).unwrap();
            } catch (err) {
                console.error('Failed to delete volunteer:', err);
            }
        }
    };

    const handleEdit = (volunteer) => {
        setSelectedVolunteer(volunteer);
        setFormData({
            name: volunteer.name,
            email: volunteer.email,
            phone: volunteer.phone,
            password: '' // Don't populate password for security
        });
        setEditMode(true);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setSelectedVolunteer(null);
        setFormData(initialFormData);
    };

    const handleNew = () => {
        setEditMode(false);
        setSelectedVolunteer(null);
        setFormData(initialFormData);
        setOpen(true);
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" color="primary">
                    Manage Volunteers
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleNew}
                >
                    Add New Volunteer
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {volunteers?.map((volunteer) => (
                            <TableRow key={volunteer._id}>
                                <TableCell>{volunteer.name}</TableCell>
                                <TableCell>{volunteer.email}</TableCell>
                                <TableCell>{volunteer.phone}</TableCell>
                                <TableCell>
                                    <Button
                                        color="primary"
                                        onClick={() => handleEdit(volunteer)}
                                        sx={{ mr: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        color="error"
                                        onClick={() => handleDelete(volunteer._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog 
                open={open} 
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    {editMode ? 'Edit Volunteer' : 'Add New Volunteer'}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required={!editMode}
                            margin="normal"
                            helperText={editMode ? "Leave blank to keep current password" : ""}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button 
                        onClick={handleSubmit}
                        variant="contained" 
                        color="primary"
                    >
                        {editMode ? 'Update' : 'Add'} Volunteer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ManageVolunteers;