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
    MenuItem,
    Box,
    Alert,
    CircularProgress
} from '@mui/material';
import {
    fetchActivities,
    createActivity,
    updateActivity,
    deleteActivity,
    updateActivityStatus
} from '../redux/slices/activitiesSlice';

const initialFormData = {
    title: '',
    description: '',
    date: '',
    venue: '',
    type: 'classroom',
    status: 'upcoming'
};

const ManageActivities = () => {
    const dispatch = useDispatch();
    const { activities, isLoading, error } = useSelector((state) => state.activities);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        dispatch(fetchActivities());
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
            if (editMode && selectedActivity) {
                await dispatch(updateActivity({ 
                    id: selectedActivity._id, 
                    data: formData 
                })).unwrap();
            } else {
                await dispatch(createActivity(formData)).unwrap();
            }
            handleClose();
        } catch (err) {
            console.error('Failed to save activity:', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this activity?')) {
            try {
                await dispatch(deleteActivity(id)).unwrap();
            } catch (err) {
                console.error('Failed to delete activity:', err);
            }
        }
    };

    const handleEdit = (activity) => {
        setSelectedActivity(activity);
        setFormData({
            title: activity.title,
            description: activity.description,
            date: new Date(activity.date).toISOString().split('T')[0],
            venue: activity.venue,
            type: activity.type,
            status: activity.status
        });
        setEditMode(true);
        setOpen(true);
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await dispatch(updateActivityStatus({ id, status: newStatus })).unwrap();
        } catch (err) {
            console.error('Failed to update status:', err);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setSelectedActivity(null);
        setFormData(initialFormData);
    };

    const handleNew = () => {
        setEditMode(false);
        setSelectedActivity(null);
        setFormData(initialFormData);
        setOpen(true);
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                <CircularProgress />
            </Box>
        );
    };

    return (
        <div>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" color="primary">
                    Manage Activities
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleNew}
                >
                    Add New Activity
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
                            <TableCell>Title</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Venue</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activities.map((activity) => (
                            <TableRow key={activity._id}>
                                <TableCell>{activity.title}</TableCell>
                                <TableCell>{activity.type}</TableCell>
                                <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
                                <TableCell>{activity.venue}</TableCell>
                                <TableCell>
                                    <TextField
                                        select
                                        size="small"
                                        value={activity.status}
                                        onChange={(e) => handleStatusChange(activity._id, e.target.value)}
                                        sx={{ minWidth: 120 }}
                                    >
                                        <MenuItem value="upcoming">Upcoming</MenuItem>
                                        <MenuItem value="ongoing">Ongoing</MenuItem>
                                        <MenuItem value="completed">Completed</MenuItem>
                                    </TextField>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        color="primary"
                                        onClick={() => handleEdit(activity)}
                                        sx={{ mr: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        color="error"
                                        onClick={() => handleDelete(activity._id)}
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
                maxWidth="md" 
                fullWidth
                aria-labelledby="activity-dialog-title"
            >
                <DialogTitle id="activity-dialog-title">
                    {editMode ? 'Edit Activity' : 'Add New Activity'}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" id="activity-form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            fullWidth
                            label="Venue"
                            name="venue"
                            value={formData.venue}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            select
                            label="Type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            margin="normal"
                        >
                            <MenuItem value="classroom">Classroom</MenuItem>
                            <MenuItem value="special">Special Event</MenuItem>
                            <MenuItem value="camp">Camp</MenuItem>
                        </TextField>
                        <TextField
                            fullWidth
                            select
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                            margin="normal"
                        >
                            <MenuItem value="upcoming">Upcoming</MenuItem>
                            <MenuItem value="ongoing">Ongoing</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                        </TextField>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button 
                        type="submit"
                        form="activity-form"
                        variant="contained" 
                        color="primary"
                    >
                        {editMode ? 'Update' : 'Add'} Activity
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ManageActivities;