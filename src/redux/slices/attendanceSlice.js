import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    attendance: [],
    isLoading: false,
    error: null
};

export const fetchAttendance = createAsyncThunk(
    'attendance/fetchAttendance',
    async () => {
        const response = await axios.get('https://fstapp-backend.vercel.app/api/attendance');
        return response.data;
    }
);

export const markAttendance = createAsyncThunk(
    'attendance/markAttendance',
    async (data, { getState }) => {
        const { auth } = getState();
        const response = await axios.post('https://fstapp-backend.vercel.app/api/attendance', data, {
            headers: { Authorization: `Bearer ${auth.token}` }
        });
        return response.data;
    }
);

export const fetchActivityAttendance = createAsyncThunk(
    'attendance/fetchActivityAttendance',
    async (activityId, { getState }) => {
        const { auth } = getState();
        const response = await axios.get(`https://fstapp-backend.vercel.app/api/attendance/activity/${activityId}`, {
            headers: { Authorization: `Bearer ${auth.token}` }
        });
        return response.data;
    }
);

const attendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAttendance.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAttendance.fulfilled, (state, action) => {
                state.isLoading = false;
                state.attendance = action.payload;
            })
            .addCase(fetchAttendance.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(markAttendance.fulfilled, (state, action) => {
                const index = state.attendance.findIndex(a => 
                    a.activityId === action.payload.activityId && 
                    a.userId === action.payload.userId
                );
                if (index !== -1) {
                    state.attendance[index] = action.payload;
                } else {
                    state.attendance.push(action.payload);
                }
            })
            .addCase(fetchActivityAttendance.fulfilled, (state, action) => {
                state.attendance = action.payload;
            });
    }
});

export default attendanceSlice.reducer;