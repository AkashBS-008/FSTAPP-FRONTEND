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
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Chip
} from '@mui/material';
import {
    fetchBloodRequirements,
    createBloodRequirement,
    updateBloodRequirementStatus
} from '../redux/slices/bloodRequirementsSlice';

const initialFormData = {
    recipientName: '',
    bloodGroup: '',
    unitsNeeded: '',
    hospitalName: '',
    contactNumber: '',
    details: ''
};

const ManageBloodRequirements = () => {
    const { requirements } = useSelector((state) => state.bloodRequirements);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(initialFormData);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createBloodRequirement(formData)).unwrap();
            handleClose();
        } catch (error) {
            alert(error?.message || 'Failed to create blood requirement');
        }
    };

    const handleClose = () => {
        setOpen(false);
        setFormData(initialFormData);
    };

    useEffect(() => {
        dispatch(fetchBloodRequirements());
    }, [dispatch]);

    const handleStatusChange = async (requirement, newStatus) => {
        try {
            await dispatch(updateBloodRequirementStatus({ id: requirement._id, status: newStatus })).unwrap();
        } catch (error) {
            alert(error?.message || 'Failed to update status');
        }
    };

    return (
        <div>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" color="primary">
                    Manage Blood Requirements
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => setOpen(true)}
                >
                    Add New Requirement
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Recipient</TableCell>
                            <TableCell>Blood Group</TableCell>
                            <TableCell>Units</TableCell>
                            <TableCell>Hospital</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requirements.map((req) => (
                            <TableRow key={req._id}>
                                <TableCell>{req.recipientName}</TableCell>
                                <TableCell>{req.bloodGroup}</TableCell>
                                <TableCell>{req.unitsNeeded}</TableCell>
                                <TableCell>{req.hospitalName}</TableCell>
                                <TableCell>{req.contactNumber}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={req.status}
                                        color={req.status === 'active' ? 'error' : 'success'}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        color="primary"
                                        onClick={() => handleStatusChange(req, 'fulfilled')}
                                        disabled={req.status !== 'active'}
                                    >
                                        Mark Fulfilled
                                    </Button>
                                    <Button
                                        color="error"
                                        onClick={() => handleStatusChange(req, 'closed')}
                                        disabled={req.status === 'closed'}
                                    >
                                        Close
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
                <DialogTitle>Add New Blood Requirement</DialogTitle>
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
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                                <MenuItem key={group} value={group}>{group}</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            label="Units Needed"
                            name="unitsNeeded"
                            value={formData.unitsNeeded}
                            onChange={handleChange}
                            required
                            margin="normal"
                            type="number"
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
                            label="Additional Details"
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            margin="normal"
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
                        Add Requirement
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ManageBloodRequirements;