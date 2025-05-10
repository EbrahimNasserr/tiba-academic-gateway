import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching books from Google Drive
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (year) => {
    try {
      const response = await fetch(`/api/books?year=${year}`);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  books: [],
  isLoading: false,
  error: null,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearBooks: (state) => {
      state.books = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearBooks } = bookSlice.actions;
export default bookSlice.reducer; 