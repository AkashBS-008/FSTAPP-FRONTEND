import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Event as EventIcon,
    Bloodtype as BloodIcon,
    People as PeopleIcon
} from '@mui/icons-material';
import ManageActivities from './ManageActivities';
import ManageBloodRequirements from './ManageBloodRequirements';
import ManageAttendance from './ManageAttendance';
import ManageVolunteers from './ManageVolunteers';

const AdminDashboard = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            Admin Dashboard
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <List>
                            <ListItem button component={Link} to="/admin">
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Overview" />
                            </ListItem>
                            <ListItem button component={Link} to="/admin/activities">
                                <ListItemIcon>
                                    <EventIcon />
                                </ListItemIcon>
                                <ListItemText primary="Activities" />
                            </ListItem>
                            <ListItem button component={Link} to="/admin/blood-requirements">
                                <ListItemIcon>
                                    <BloodIcon />
                                </ListItemIcon>
                                <ListItemText primary="Blood Requirements" />
                            </ListItem>
                            <ListItem button component={Link} to="/admin/volunteers">
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Volunteers" />
                            </ListItem>
                            <ListItem button component={Link} to="/admin/attendance">
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Attendance" />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Paper sx={{ p: 2 }}>
                        <Routes>
                            <Route index element={<AdminOverview />} />
                            <Route path="activities/*" element={<ManageActivities />} />
                            <Route path="blood-requirements" element={<ManageBloodRequirements />} />
                            <Route path="volunteers" element={<ManageVolunteers />} />
                            <Route path="attendance" element={<ManageAttendance />} />
                        </Routes>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

// Overview component
const AdminOverview = () => {
    return (
        <Box>
            <Typography variant="h5" color="primary" gutterBottom>
                Welcome to Admin Dashboard
            </Typography>
            <Typography paragraph>
                Manage NSS activities, blood requirements, and attendance from this central dashboard.
                Use the menu on the left to navigate to different sections.
            </Typography>
        </Box>
    );
};

export default AdminDashboard;