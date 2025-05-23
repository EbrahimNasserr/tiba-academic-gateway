import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Get the API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_APP_URL;

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            // Add auth token for secured endpoints if available
            // '1|l1d5yICEz0VMQ4se6oTnw20bC91yklzGwsyb6vHJc4c35dbf'
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Lectures', 'Subjects', 'Years', 'Doctors', 'Admins'],
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
        updateLecture: builder.mutation({
            query: ({ id, ...lectureData }) => ({
                url: `/lectures/${id}`,
                method: 'PUT',
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

        // Admins endpoints
        getAdmins: builder.query({
            query: ({ q = '' }) => `/users?q=${q}`,
            providesTags: ['Admins']
        }),
        getAdminById: builder.query({
            query: (id) => `/users/${id}`,
            providesTags: (result, error, id) => [{ type: 'Admins', id }]
        }),
        createAdmin: builder.mutation({
            query: (adminData) => ({
                url: '/users',
                method: 'POST',
                body: adminData
            }),
            invalidatesTags: ['Admins']
        }),
        updateAdmin: builder.mutation({
            query: ({ id, ...adminData }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: adminData
            }),
            invalidatesTags: ['Admins']
        }),
        deleteAdmin: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Admins']
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
    useUpdateLectureMutation,
    useDeleteLectureMutation,

    // Doctors hooks
    useGetDoctorsQuery,
    useGetDoctorByIdQuery,
    useCreateDoctorMutation,
    useUpdateDoctorMutation,
    useDeleteDoctorMutation,

    // Admins hooks
    useGetAdminsQuery,
    useGetAdminByIdQuery,
    useCreateAdminMutation,
    useUpdateAdminMutation,
    useDeleteAdminMutation,
} = apiSlice; 