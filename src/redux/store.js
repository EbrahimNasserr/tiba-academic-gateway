import { configureStore } from '@reduxjs/toolkit';
import yearsReducer from './features/yearsSlice';
import themeReducer from './features/themeSlice';
import subjectsReducer from './features/subjectsSlice';
import lecturesReducer from './features/lecturesSlice';

export const store = configureStore({
    reducer: {
        years: yearsReducer,
        theme: themeReducer,
        subjects: subjectsReducer,
        lectures: lecturesReducer,
        // Add additional reducers here as they are created
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Export hooks for use in functional components
export * from './hooks'; 