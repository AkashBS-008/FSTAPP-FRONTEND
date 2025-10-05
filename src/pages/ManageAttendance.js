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
    Checkbox,
    CircularProgress,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { fetchActivityAttendance, markAttendance } from '../redux/slices/attendanceSlice';
import { fetchActivities } from '../redux/slices/activitiesSlice';
import { fetchVolunteers } from '../redux/slices/volunteersSlice';

const ManageAttendance = () => {
    const dispatch = useDispatch();
    const { activities } = useSelector((state) => state.activities);
    const { volunteers } = useSelector((state) => state.volunteers);
    const { attendance, isLoading, error } = useSelector((state) => state.attendance);
    const [selectedActivityId, setSelectedActivityId] = useState('');
    const [attendanceData, setAttendanceData] = useState({});
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        dispatch(fetchActivities());
        dispatch(fetchVolunteers());
    }, [dispatch]);

    useEffect(() => {
        if (selectedActivityId) {
            dispatch(fetchActivityAttendance(selectedActivityId))
                .unwrap()
                .then(data => {
                    const attendanceMap = {};
                    data.forEach(record => {
                        attendanceMap[record.userId._id] = record.status === 'present';
                    });
                    setAttendanceData(attendanceMap);
                    setSaveSuccess(false);
                })
                .catch(console.error);
        }
    }, [selectedActivityId, dispatch]);

    const handleActivityChange = (event) => {
        setSelectedActivityId(event.target.value);
        setSaveSuccess(false);
    };

    const handleAttendanceChange = (userId) => {
        setAttendanceData(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }));
        setSaveSuccess(false);
    };

    const handleSubmitAttendance = async () => {
        if (!selectedActivityId) return;

        const records = volunteers.map(volunteer => ({
            userId: volunteer._id,
            activityId: selectedActivityId,
            status: attendanceData[volunteer._id] ? 'present' : 'absent'
        }));

        try {
            await dispatch(markAttendance({ activityId: selectedActivityId, records })).unwrap();
            setSaveSuccess(true);
        } catch (error) {
            console.error('Failed to save attendance:', error);
        }
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
            <Typography variant="h5" color="primary" gutterBottom>
                Manage Attendance
            </Typography>

            <Box sx={{ mb: 3 }}>
                <FormControl fullWidth>
                    <InputLabel>Select Activity</InputLabel>
                    <Select
                        value={selectedActivityId}
                        label="Select Activity"
                        onChange={handleActivityChange}
                    >
                        {activities.map((activity) => (
                            <MenuItem key={activity._id} value={activity._id}>
                                {activity.title} - {new Date(activity.date).toLocaleDateString()}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {saveSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    Attendance saved successfully!
                </Alert>
            )}

            {selectedActivityId && (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell align="center">Present</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {volunteers.map((volunteer) => (
                                    <TableRow key={volunteer._id}>
                                        <TableCell>{volunteer.name}</TableCell>
                                        <TableCell>{volunteer.email}</TableCell>
                                        <TableCell>{volunteer.phone}</TableCell>
                                        <TableCell align="center">
                                            <Checkbox
                                                checked={attendanceData[volunteer._id] || false}
                                                onChange={() => handleAttendanceChange(volunteer._id)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmitAttendance}
                            disabled={!selectedActivityId || volunteers.length === 0}
                        >
                            Save Attendance
                        </Button>
                    </Box>
                </>
            )}
        </div>
    );
};

export default ManageAttendance;