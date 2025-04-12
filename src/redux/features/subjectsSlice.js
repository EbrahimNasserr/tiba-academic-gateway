import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get the API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_APP_URL || 'http://127.0.0.1:8000/api';

// Async thunk for fetching all subjects
export const fetchSubjects = createAsyncThunk(
    'subjects/fetchSubjects',
    async ({ q, year_id }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/subjects?q=${q}&year_id=${year_id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch subjects');
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for creating a new subject
export const createSubject = createAsyncThunk(
    'subjects/createSubject',
    async (subjectData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/subjects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 1|WpkEey6ZQXW7H9VQFRGWk2k739pWrjXq7SRI0t3I5436dd6f`,
                },
                body: JSON.stringify(subjectData),
            });

            if (!response.ok) {
                throw new Error('Failed to create subject');
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for updating a subject
export const updateSubject = createAsyncThunk(
    'subjects/updateSubject',
    async ({ id, subjectData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/subjects/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 1|WpkEey6ZQXW7H9VQFRGWk2k739pWrjXq7SRI0t3I5436dd6f`,

                },
                body: JSON.stringify(subjectData),
            });

            if (!response.ok) {
                throw new Error('Failed to update subject');
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for deleting a subject
export const deleteSubject = createAsyncThunk(
    'subjects/deleteSubject',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/subjects/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer 1|WpkEey6ZQXW7H9VQFRGWk2k739pWrjXq7SRI0t3I5436dd6f`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete subject');
            }

            return id; // Return the ID so we can remove it from state
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    subjects: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    createStatus: 'idle',
    updateStatus: 'idle',
    deleteStatus: 'idle',
};

const subjectsSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {
        resetSubjectsStatus: (state) => {
            state.status = 'idle';
            state.createStatus = 'idle';
            state.updateStatus = 'idle';
            state.deleteStatus = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch subjects reducers
            .addCase(fetchSubjects.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSubjects.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.subjects = action.payload;
            })
            .addCase(fetchSubjects.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Create subject reducers
            .addCase(createSubject.pending, (state) => {
                state.createStatus = 'loading';
            })
            .addCase(createSubject.fulfilled, (state, action) => {
                state.createStatus = 'succeeded';
                state.subjects.push(action.payload);
            })
            .addCase(createSubject.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.error = action.payload;
            })

            // Update subject reducers
            .addCase(updateSubject.pending, (state) => {
                state.updateStatus = 'loading';
            })
            .addCase(updateSubject.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';
                const index = state.subjects.findIndex(subject => subject.id === action.payload.id);
                if (index !== -1) {
                    state.subjects[index] = action.payload;
                }
            })
            .addCase(updateSubject.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.error = action.payload;
            })

            // Delete subject reducers
            .addCase(deleteSubject.pending, (state) => {
                state.deleteStatus = 'loading';
            })
            .addCase(deleteSubject.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded';
                state.subjects = state.subjects.filter(subject => subject.id !== action.payload);
            })
            .addCase(deleteSubject.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.error = action.payload;
            });
    },
});

export const { resetSubjectsStatus } = subjectsSlice.actions;

// Export selectors
export const selectAllSubjects = (state) => state.subjects.subjects;
export const selectSubjectsStatus = (state) => state.subjects.status;
export const selectCreateStatus = (state) => state.subjects.createStatus;
export const selectUpdateStatus = (state) => state.subjects.updateStatus;
export const selectDeleteStatus = (state) => state.subjects.deleteStatus;
export const selectSubjectsError = (state) => state.subjects.error;

export default subjectsSlice.reducer; 