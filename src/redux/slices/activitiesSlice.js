import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { activitiesApi } from '../../utils/api';

const initialState = {
    activities: [],
    selectedActivity: null,
    isLoading: false,
    error: null
};

export const fetchActivities = createAsyncThunk(
    'activities/fetchActivities',
    async (_, { rejectWithValue }) => {
        try {
            const response = await activitiesApi.getAll();
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch activities');
        }
    }
);

export const createActivity = createAsyncThunk(
    'activities/createActivity',
    async (activityData, { rejectWithValue }) => {
        try {
            const response = await activitiesApi.create(activityData);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to create activity');
        }
    }
);

export const updateActivity = createAsyncThunk(
    'activities/updateActivity',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await activitiesApi.update(id, data);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to update activity');
        }
    }
);

export const deleteActivity = createAsyncThunk(
    'activities/deleteActivity',
    async (id, { rejectWithValue }) => {
        try {
            await activitiesApi.delete(id);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to delete activity');
        }
    }
);

export const updateActivityStatus = createAsyncThunk(
    'activities/updateStatus',
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await activitiesApi.updateStatus(id, status);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to update activity status');
        }
    }
);

const activitiesSlice = createSlice({
    name: 'activities',
    initialState,
    reducers: {
        setSelectedActivity: (state, action) => {
            state.selectedActivity = action.payload;
        },
        clearSelectedActivity: (state) => {
            state.selectedActivity = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch activities
            .addCase(fetchActivities.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchActivities.fulfilled, (state, action) => {
                state.isLoading = false;
                state.activities = action.payload;
                state.error = null;
            })
            .addCase(fetchActivities.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            // Create activity
            .addCase(createActivity.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createActivity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.activities.unshift(action.payload);
                state.error = null;
            })
            .addCase(createActivity.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            // Update activity
            .addCase(updateActivity.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateActivity.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.activities.findIndex(act => act._id === action.payload._id);
                if (index !== -1) {
                    state.activities[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(updateActivity.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            // Delete activity
            .addCase(deleteActivity.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteActivity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.activities = state.activities.filter(act => act._id !== action.payload);
                state.error = null;
            })
            .addCase(deleteActivity.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            // Update activity status
            .addCase(updateActivityStatus.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateActivityStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.activities.findIndex(act => act._id === action.payload._id);
                if (index !== -1) {
                    state.activities[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(updateActivityStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            });
    }
});

export const { setSelectedActivity, clearSelectedActivity } = activitiesSlice.actions;
export default activitiesSlice.reducer;