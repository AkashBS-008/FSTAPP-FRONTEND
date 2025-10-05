import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Configure axios defaults
axios.defaults.baseURL = BASE_URL;

// Add auth token to requests
// Add request interceptor
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

// Add response interceptor
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Blood Requirements API
export const bloodRequirementsApi = {
    getAll: () => axios.get('/blood-requirements'),
    create: (data) => axios.post('/blood-requirements', data),
    updateStatus: (id, status) => axios.put(`/blood-requirements/${id}/status`, { status }),
    delete: (id) => axios.delete(`/blood-requirements/${id}`)
};

// Activities API
export const activitiesApi = {
    getAll: () => axios.get('/activities'),
    create: (data) => axios.post('/activities', data),
    update: (id, data) => axios.put(`/activities/${id}`, data),
    delete: (id) => axios.delete(`/activities/${id}`),
    getById: (id) => axios.get(`/activities/${id}`),
    updateStatus: (id, status) => axios.patch(`/activities/${id}/status`, { status })
};

// Auth API
export const authApi = {
    login: (credentials) => axios.post('/auth/login', credentials),
    register: (userData) => axios.post('/auth/register', userData),
    getProfile: () => axios.get('/auth/profile')
};

// Attendance API
export const attendanceApi = {
    getAll: () => axios.get('/attendance'),
    mark: (data) => axios.post('/attendance', data),
    getByActivity: (activityId) => axios.get(`/attendance/activity/${activityId}`)
};