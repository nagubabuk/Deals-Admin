import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SaleItem {
    itemId: string;
    itemName: string;
    quantity: number;
    price: number;
    _id: string;
}
// Main interface combining sales data and analytics
interface SalesData {
    salesData: SaleRecord[]; // Array of sales records
    analytics: AnalyticsData; // Analytics information
}
interface SaleRecord {
    id?:string;
    _id: string;
    date: string; // ISO string format for dates
    amount: number;
    customerName: string;
    saleType: "online" | "in_store"; // Restrict to specific strings
    items: SaleItem[]; // Array of items in the sale
    isRefunded: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
interface AnalyticsData {
    totalRevenue: number;
    totalSales: number;
    customersOnboarded: number;
    growthRate: number;
}
interface SalesState {
    data: SalesData;
    loading: boolean;
    error: string | null;
}

const initialState: SalesState = {
    data: {
        salesData: [], // Empty array for sales data
        analytics: {
            totalRevenue: 0,
            totalSales: 0,
            customersOnboarded: 0,
            growthRate: 0,
        },
    },
    loading: false,
    error: null,
};

const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        setSalesData: (state, action: PayloadAction<SalesState["data"]>) => {
            console.log("action.payload;",action.payload)
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