import { AppDispatch } from "../store";
import { setError, setLoading, setSalesData } from "../store/slices/salesSlice";
import { AxiosResponse } from 'axios';
import api from './api';

export const fetchSalesData = (filterType:string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await api.get(`sales/filter`, {
            params: {
                filterType
            }
       } ); // Replace with your backend API URL
        const data = response.data; // Assuming the response is the array of sales data

        // Dispatch the sales data to the store
        dispatch(setSalesData(data));
    } catch (error) {
        dispatch(setError('Failed to fetch sales data')); // Handle error state if the API call fails
    } finally {
        dispatch(setLoading(false)); // Set loading state to false after the request is complete
    }
};
