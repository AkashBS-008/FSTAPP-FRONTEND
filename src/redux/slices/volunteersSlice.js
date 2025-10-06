import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const fetchVolunteers = createAsyncThunk(
    'volunteers/fetchVolunteers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://fstapp-backend.vercel.app/api/users/volunteers');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Failed to fetch volunteers' });
        }
    }
);

export const createVolunteer = createAsyncThunk(
    'volunteers/createVolunteer',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://fstapp-backend.vercel.app/api/users/register', {
                ...data,
                role: 'volunteer'
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateVolunteer = createAsyncThunk(
    'volunteers/updateVolunteer',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`https://fstapp-backend.vercel.app/api/users/${id}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteVolunteer = createAsyncThunk(
    'volunteers/deleteVolunteer',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`https://fstapp-backend.vercel.app/api/users/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const volunteersSlice = createSlice({
    name: 'volunteers',
    initialState: {
        volunteers: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch volunteers
            .addCase(fetchVolunteers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchVolunteers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.volunteers = action.payload;
            })
            .addCase(fetchVolunteers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Failed to fetch volunteers';
            })
            // Create volunteer
            .addCase(createVolunteer.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createVolunteer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.volunteers.push(action.payload);
            })
            .addCase(createVolunteer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Failed to create volunteer';
            })
            // Update volunteer
            .addCase(updateVolunteer.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateVolunteer.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.volunteers.findIndex(v => v._id === action.payload._id);
                if (index !== -1) {
                    state.volunteers[index] = action.payload;
                }
            })
            .addCase(updateVolunteer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Failed to update volunteer';
            })
            // Delete volunteer
            .addCase(deleteVolunteer.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteVolunteer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.volunteers = state.volunteers.filter(v => v._id !== action.payload);
            })
            .addCase(deleteVolunteer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Failed to delete volunteer';
            });
    }
});

export default volunteersSlice.reducer;