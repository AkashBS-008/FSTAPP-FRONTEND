import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Chip,
    Alert,
    CircularProgress
} from '@mui/material';
import axios from 'axios';

const MyAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get(`https://fstapp-backend.vercel.app/api/attendance/user/${user.id}`);
                setAttendance(response.data);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to fetch attendance records');
                setIsLoading(false);
            }
        };

        if (user) {
            fetchAttendance();
        }
    }, [user]);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                {error}
            </Alert>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" color="primary" gutterBottom>
                My Attendance
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Activity</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attendance.map((record) => (
                            <TableRow key={record._id}>
                                <TableCell>{record.activityId.title}</TableCell>
                                <TableCell>
                                    {new Date(record.activityId.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={record.status}
                                        color={record.status === 'present' ? 'success' : 'error'}
                                        size="small"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            {attendance.length === 0 && (
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                    No attendance records found
                </Typography>
            )}
        </Box>
    );
};

export default MyAttendance;