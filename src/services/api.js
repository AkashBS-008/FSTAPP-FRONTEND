import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Add auth token to requests
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth API
export const login = (credentials) => axios.post(`${BASE_URL}/auth/login`, credentials);
export const register = (userData) => axios.post(`${BASE_URL}/auth/register`, userData);
export const getProfile = () => axios.get(`${BASE_URL}/auth/profile`);

// Activities API
export const getActivities = () => axios.get(`${BASE_URL}/activities`);
export const createActivity = (data) => axios.post(`${BASE_URL}/activities`, data);
export const updateActivity = (id, data) => axios.put(`${BASE_URL}/activities/${id}`, data);
export const deleteActivity = (id) => axios.delete(`${BASE_URL}/activities/${id}`);

// Blood Requirements API
export const getBloodRequirements = () => axios.get(`${BASE_URL}/blood-requirements`);
export const createBloodRequirement = (data) => axios.post(`${BASE_URL}/blood-requirements`, data);
export const updateBloodRequirementStatus = (id, status) => axios.put(`${BASE_URL}/blood-requirements/${id}/status`, { status });
export const deleteBloodRequirement = (id) => axios.delete(`${BASE_URL}/blood-requirements/${id}`);

// Attendance API
export const getAttendance = () => axios.get(`${BASE_URL}/attendance`);
export const markAttendance = (data) => axios.post(`${BASE_URL}/attendance`, data);
export const getActivityAttendance = (activityId) => axios.get(`${BASE_URL}/attendance/activity/${activityId}`);