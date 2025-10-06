import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Configure axios defaults
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Add request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Log the request for debugging
        console.log('API Request:', {
            url: config.url,
            method: config.method,
            headers: config.headers,
            data: config.data
        });
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor
api.interceptors.response.use(
    (response) => {
        // Log successful responses for debugging
        console.log('API Response:', {
            url: response.config.url,
            status: response.status,
            data: response.data
        });
        return response;
    },
    (error) => {
        // Log error responses for debugging
        console.error('API Error:', {
            url: error.config?.url,
            status: error.response?.status,
            message: error.message,
            response: error.response?.data
        });

        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Blood Requirements API
export const bloodRequirementsApi = {
    getAll: () => api.get('/blood-requirements'),
    create: (data) => api.post('/blood-requirements', data),
    updateStatus: (id, status) => api.put(`/blood-requirements/${id}/status`, { status }),
    delete: (id) => api.delete(`/blood-requirements/${id}`)
};

// Activities API
export const activitiesApi = {
    getAll: () => api.get('/activities'),
    create: (data) => api.post('/activities', data),
    update: (id, data) => api.put(`/activities/${id}`, data),
    delete: (id) => api.delete(`/activities/${id}`),
    getById: (id) => api.get(`/activities/${id}`),
    updateStatus: (id, status) => api.patch(`/activities/${id}/status`, { status })
};

// Auth API
export const authApi = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    getProfile: () => api.get('/auth/profile')
};

// Attendance API
export const attendanceApi = {
    getAll: () => api.get('/attendance'),
    mark: (data) => api.post('/attendance', data),
    getByActivity: (activityId) => api.get(`/attendance/activity/${activityId}`)
};