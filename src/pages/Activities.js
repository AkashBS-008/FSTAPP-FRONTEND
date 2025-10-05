import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Container, 
    Typography, 
    Grid, 
    Card, 
    CardContent, 
    CardMedia,
    Button,
    Box,
    Chip
} from '@mui/material';
import { fetchActivities } from '../redux/slices/activitiesSlice';

const Activities = () => {
    const dispatch = useDispatch();
    const { activities, isLoading } = useSelector((state) => state.activities);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchActivities());
    }, [dispatch]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'upcoming':
                return 'primary';
            case 'ongoing':
                return 'success';
            case 'completed':
                return 'secondary';
            default:
                return 'default';
        }
    };

    if (isLoading) {
        return (
            <Container>
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" component="h1" color="primary">
                    NSS Activities
                </Typography>
                {user?.role === 'admin' && (
                    <Button 
                        variant="contained" 
                        color="primary" 
                        href="/admin/activities/new"
                    >
                        Add New Activity
                    </Button>
                )}
            </Box>

            <Grid container spacing={3}>
                {activities.map((activity) => (
                    <Grid item xs={12} md={6} key={activity._id}>
                        <Card>
                            {activity.images?.[0] && (
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={activity.images[0]}
                                    alt={activity.title}
                                />
                            )}
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                    <Typography variant="h6" gutterBottom>
                                        {activity.title}
                                    </Typography>
                                    <Chip 
                                        label={activity.status}
                                        color={getStatusColor(activity.status)}
                                        size="small"
                                    />
                                </Box>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {activity.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Venue: {activity.venue}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Date: {new Date(activity.date).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Type: {activity.type}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Activities;