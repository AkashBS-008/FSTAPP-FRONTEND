import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import activitiesReducer from './slices/activitiesSlice';
import bloodRequirementsReducer from './slices/bloodRequirementsSlice';
import attendanceReducer from './slices/attendanceSlice';
import volunteersReducer from './slices/volunteersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    activities: activitiesReducer,
    bloodRequirements: bloodRequirementsReducer,
    attendance: attendanceReducer,
    volunteers: volunteersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});