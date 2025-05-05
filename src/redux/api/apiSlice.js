import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Get the API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_APP_URL;

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            // Add auth token for secured endpoints if available
            const token = '1|l1d5yICEz0VMQ4se6oTnw20bC91yklzGwsyb6vHJc4c35dbf';
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Lectures', 'Subjects', 'Years', 'Doctors'],
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
        }),
        createLecture: builder.mutation({
            query: (lectureData) => ({
                url: '/lectures',
                method: 'POST',
                body: lectureData
            }),
            invalidatesTags: ['Lectures']
        }),
        deleteLecture: builder.mutation({
            query: (id) => ({
                url: `/lectures/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Lectures']
        }),

        // Doctors endpoints
        getDoctors: builder.query({
            query: ({ q = '' }) => `/doctors?q=${q}`,
            providesTags: ['Doctors']
        }),
        getDoctorById: builder.query({
            query: (id) => `/doctors/${id}`,
            providesTags: (result, error, id) => [{ type: 'Doctors', id }]
        }),
        createDoctor: builder.mutation({
            query: (doctorData) => ({
                url: '/doctors',
                method: 'POST',
                body: doctorData
            }),
            invalidatesTags: ['Doctors']
        }),
        updateDoctor: builder.mutation({
            query: ({ id, ...doctorData }) => ({
                url: `/doctors/${id}`,
                method: 'PUT',
                body: doctorData
            }),
            invalidatesTags: ['Doctors']
        }),
        deleteDoctor: builder.mutation({
            query: (id) => ({
                url: `/doctors/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Doctors']
        }),
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
    useGetLectureByIdQuery,
    useCreateLectureMutation,
    useDeleteLectureMutation,

    // Doctors hooks
    useGetDoctorsQuery,
    useGetDoctorByIdQuery,
    useCreateDoctorMutation,
    useUpdateDoctorMutation,
    useDeleteDoctorMutation,
} = apiSlice; 