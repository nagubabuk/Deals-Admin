import { AppDispatch } from '../store';
import { setSalesData, setLoading, setError } from '../store/slices/salesSlice';
import axios from 'axios';

export const fetchSalesData = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        // Simulating API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Dummy data
        const data = [
            { id: '1', date: '2023-05-01', amount: 1000, product: 'Product A' },
            { id: '2', date: '2023-05-02', amount: 1500, product: 'Product B' },
            { id: '3', date: '2023-05-03', amount: 2000, product: 'Product C' },
            { id: '4', date: '2023-05-04', amount: 2500, product: 'Product D' },
            { id: '5', date: '2023-05-05', amount: 3000, product: 'Product E' },
        ];

        dispatch(setSalesData(data));
    } catch (error) {
        dispatch(setError('Failed to fetch sales data'));
    } finally {
        dispatch(setLoading(false));
    }
};


const api = axios.create({
    baseURL: 'http://localhost:5000/api', // This can be any URL since we're intercepting
});

// Request interceptor
api.interceptors.request.use((config) => {
    // You can modify the request config here (e.g., add headers)
    return config;
});

// Response interceptor
api.interceptors.response.use(
    (response) => {
        // This is for successful responses
        return response;
    },
    (error) => {
        // This is for errors
        const { config, response } = error;

        if (response && response.status === 404) {
            // Handle 404 errors (endpoint not found)
            return handleMockResponse(config);
        }

        return Promise.reject(error);
    }
);

const handleMockResponse = (config:any) => {
    const { url, method } = config;

    if (url.includes('/login') && method === 'post') {
        return Promise.resolve({
            data: { id: '1', name: 'John Doe', email: 'john@example.com', token: 'dummy_token' },
        });
    }

    if (url.includes('/signup') && method === 'post') {
        return Promise.resolve({
            data: { id: '2', name: 'Jane Doe', email: 'jane@example.com', token: 'dummy_token' },
        });
    }

    if (url.includes('/sales') && method === 'get') {
        return Promise.resolve({
            data: [
                { id: '1', date: '2023-05-01', amount: 1000, product: 'Product A' },
                { id: '2', date: '2023-05-02', amount: 1500, product: 'Product B' },
                { id: '3', date: '2023-05-03', amount: 2000, product: 'Product C' },
                { id: '4', date: '2023-05-04', amount: 2500, product: 'Product D' },
                { id: '5', date: '2023-05-05', amount: 3000, product: 'Product E' },
            ],
        });
    }

    // Default case: return a 404 error
    return Promise.reject({ response: { status: 404, data: 'Not found' } });
};

export default api;