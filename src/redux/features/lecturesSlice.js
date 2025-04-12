import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get the API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_APP_URL || 'http://127.0.0.1:8000/api';

// Async thunk for fetching lectures
export const fetchLectures = createAsyncThunk(
    'lectures/fetchLectures',
    async ({ q = '', subject_id = '', year_id = '', doctor_id = '' }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/lectures?q=${q}&subject_id=${subject_id}&year_id=${year_id}&doctor_id=${doctor_id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch lectures');
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for fetching a single lecture by ID
export const fetchLectureById = createAsyncThunk(
    'lectures/fetchLectureById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/lectures/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch lecture');
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    lectures: [],
    currentLecture: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    currentLectureStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    currentLectureError: null,
};

const lecturesSlice = createSlice({
    name: 'lectures',
    initialState,
    reducers: {
        resetLecturesStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        },
        resetCurrentLectureStatus: (state) => {
            state.currentLectureStatus = 'idle';
            state.currentLectureError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch lectures reducers
            .addCase(fetchLectures.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLectures.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.lectures = action.payload;
            })
            .addCase(fetchLectures.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Fetch lecture by id reducers
            .addCase(fetchLectureById.pending, (state) => {
                state.currentLectureStatus = 'loading';
            })
            .addCase(fetchLectureById.fulfilled, (state, action) => {
                state.currentLectureStatus = 'succeeded';
                state.currentLecture = action.payload;
            })
            .addCase(fetchLectureById.rejected, (state, action) => {
                state.currentLectureStatus = 'failed';
                state.currentLectureError = action.payload;
            });
    },
});

export const { resetLecturesStatus, resetCurrentLectureStatus } = lecturesSlice.actions;

// Export selectors
export const selectAllLectures = (state) => state.lectures.lectures;
export const selectLecturesStatus = (state) => state.lectures.status;
export const selectLecturesError = (state) => state.lectures.error;

// Export selectors for current lecture
export const selectCurrentLecture = (state) => state.lectures.currentLecture;
export const selectCurrentLectureStatus = (state) => state.lectures.currentLectureStatus;
export const selectCurrentLectureError = (state) => state.lectures.currentLectureError;

export default lecturesSlice.reducer; 