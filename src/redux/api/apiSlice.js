import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Get the API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_APP_URL || 'http://127.0.0.1:8000/api';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            // Add auth token for secured endpoints if available
            const token = '1|WpkEey6ZQXW7H9VQFRGWk2k739pWrjXq7SRI0t3I5436dd6f';
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Lectures', 'Subjects', 'Years'],
    endpoints: (builder) => ({
        // Years endpoints
        getYears: builder.query({
            query: () => '/years?q=',
            providesTags: ['Years']
        }),

        // Subjects endpoints
        getSubjects: builder.query({
            query: ({ q = '', year_id = '' }) => `/subjects?q=${q}&year_id=${year_id}`,
            providesTags: ['Subjects']
        }),
        createSubject: builder.mutation({
            query: (subjectData) => ({
                url: '/subjects',
                method: 'POST',
                body: subjectData
            }),
            invalidatesTags: ['Subjects']
        }),
        updateSubject: builder.mutation({
            query: ({ id, ...subjectData }) => ({
                url: `/subjects/${id}`,
                method: 'PUT',
                body: subjectData
            }),
            invalidatesTags: ['Subjects']
        }),
        deleteSubject: builder.mutation({
            query: (id) => ({
                url: `/subjects/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Subjects']
        }),

        // Lectures endpoints
        getLectures: builder.query({
            query: ({ q = '', subject_id = '', year_id = '', doctor_id = '' }) =>
                `/lectures?q=${q}&subject_id=${subject_id}&year_id=${year_id}&doctor_id=${doctor_id}`,
            providesTags: ['Lectures']
        }),
        getLectureById: builder.query({
            query: (id) => `/lectures/${id}`,
            providesTags: (result, error, id) => [{ type: 'Lectures', id }]
        })
    })
});

// Export hooks for usage in components
export const {
    // Years hooks
    useGetYearsQuery,

    // Subjects hooks
    useGetSubjectsQuery,
    useCreateSubjectMutation,
    useUpdateSubjectMutation,
    useDeleteSubjectMutation,

    // Lectures hooks
    useGetLecturesQuery,
    useGetLectureByIdQuery
} = apiSlice; 