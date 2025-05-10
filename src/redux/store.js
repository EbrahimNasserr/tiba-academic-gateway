import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/themeSlice';
import { apiSlice } from './api/apiSlice';
import { loginSlice, authReducer, initializeAuthState } from './api/loginSlice';
import bookReducer from './features/bookSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        books: bookReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [loginSlice.reducerPath]: loginSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(apiSlice.middleware, loginSlice.middleware),
});

// Initialize auth state from localStorage
initializeAuthState(store);