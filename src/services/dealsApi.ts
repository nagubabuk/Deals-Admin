import { AxiosResponse } from 'axios';
import api from './api';

export interface DealFormData {
    category: string;
    subCategory: string;
    dealName: string;
    dealType: 'hot deal' | 'flash deal' | 'regular deal';
    validFrom: Date | null;
    validTo: Date | null;
    quantity: number;
    description: string;
    discountPercentage: number;
    dealPrice: number;
}

export interface DealResponse {
    id: string;
    // Add other fields that the API returns
}

export const dealsApi = {
    createDeal: (formData: FormData): Promise<AxiosResponse<DealResponse>> => {
        return api.post('/deals/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    // Add other deal-related API calls here, such as:
    getDeal: (id: string): Promise<AxiosResponse<DealResponse>> => {
        return api.get(`/deals/${id}`);
    },

    updateDeal: (id: string, formData: FormData): Promise<AxiosResponse<DealResponse>> => {
        return api.put(`/deals/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    deleteDeal: (id: string): Promise<AxiosResponse<void>> => {
        return api.delete(`/deals/${id}`);
    },

    getAllDeals: (): Promise<any> => {
        return api.get('/deals');
    },
};

// export default dealsApi;