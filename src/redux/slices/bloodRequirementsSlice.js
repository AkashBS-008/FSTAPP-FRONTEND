import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bloodRequirementsApi } from '../../utils/api';

const initialState = {
    requirements: [],
    isLoading: false,
    error: null
};

export const fetchBloodRequirements = createAsyncThunk(
    'bloodRequirements/fetchRequirements',
    async (_, { rejectWithValue }) => {
        try {
            const response = await bloodRequirementsApi.getAll();
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch requirements');
        }
    }
);

export const createBloodRequirement = createAsyncThunk(
    'bloodRequirements/createRequirement',
    async (data, { rejectWithValue }) => {
        try {
            const response = await bloodRequirementsApi.create(data);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to create requirement');
        }
    }
);

export const updateBloodRequirementStatus = createAsyncThunk(
    'bloodRequirements/updateStatus',
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await bloodRequirementsApi.updateStatus(id, status);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to update status');
        }
    }
);

export const deleteBloodRequirement = createAsyncThunk(
    'bloodRequirements/delete',
    async (id, { rejectWithValue }) => {
        try {
            await bloodRequirementsApi.delete(id);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to delete requirement');
        }
    }
);

const bloodRequirementsSlice = createSlice({
    name: 'bloodRequirements',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBloodRequirements.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBloodRequirements.fulfilled, (state, action) => {
                state.isLoading = false;
                state.requirements = action.payload;
                state.error = null;
            })
            .addCase(fetchBloodRequirements.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(createBloodRequirement.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createBloodRequirement.fulfilled, (state, action) => {
                state.isLoading = false;
                state.requirements.unshift(action.payload);
                state.error = null;
            })
            .addCase(createBloodRequirement.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(updateBloodRequirementStatus.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateBloodRequirementStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedRequirement = action.payload;
                const index = state.requirements.findIndex(req => req._id === updatedRequirement._id);
                if (index !== -1) {
                    state.requirements[index] = updatedRequirement;
                }
                state.error = null;
            })
            .addCase(updateBloodRequirementStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(deleteBloodRequirement.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteBloodRequirement.fulfilled, (state, action) => {
                state.isLoading = false;
                state.requirements = state.requirements.filter(req => req._id !== action.payload);
                state.error = null;
            })
            .addCase(deleteBloodRequirement.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            });
    }
});

export default bloodRequirementsSlice.reducer;