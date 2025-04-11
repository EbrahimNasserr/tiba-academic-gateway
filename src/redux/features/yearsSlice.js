import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching years
export const fetchYears = createAsyncThunk(
    'years/fetchYears',
    async () => {
        // Use NEXT_PUBLIC_ prefix for client-side environment variables
        const API_URL = process.env.NEXT_PUBLIC_API_APP_URL || 'http://127.0.0.1:8000/api';
        const response = await fetch(`${API_URL}/years?q=`);
        if (!response.ok) {
            throw new Error('Failed to fetch years');
        }
        const data = await response.json();
        return data;
    }
);

const initialState = {
    years: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

const yearsSlice = createSlice({
    name: 'years',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchYears.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchYears.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.years = action.payload;
            })
            .addCase(fetchYears.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

// Export selectors
export const selectAllYears = (state) => state.years.years;
export const selectYearsStatus = (state) => state.years.status;
export const selectYearsError = (state) => state.years.error;

export default yearsSlice.reducer; 