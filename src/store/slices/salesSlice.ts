import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SalesData {
    id: string;
    date: string;
    amount: number;
    product: string;
}

interface SalesState {
    data: SalesData[];
    loading: boolean;
    error: string | null;
}

const initialState: SalesState = {
    data: [
        { id: '1', date: '2023-05-01', amount: 1000, product: 'Product A' },
        { id: '2', date: '2023-05-02', amount: 1500, product: 'Product B' },
        { id: '3', date: '2023-05-03', amount: 2000, product: 'Product C' },
    ],
    loading: false,
    error: null,
};

const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        setSalesData: (state, action: PayloadAction<SalesData[]>) => {
            state.data = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setSalesData, setLoading, setError } = salesSlice.actions;
export default salesSlice.reducer;