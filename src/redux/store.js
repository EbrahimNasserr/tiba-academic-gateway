import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/themeSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(apiSlice.middleware),
});