// loginSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createAction, createSlice } from '@reduxjs/toolkit';

// Create an action to set the token
export const setToken = createAction('auth/setToken');

const API_URL = process.env.NEXT_PUBLIC_API_APP_URL;

export const loginSlice = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        return {
          url: '/login',
          method: 'POST',
          body: formData,
        };
      },
      async onQueryStarted({ email, password }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const token = data.token; 
          dispatch(setToken(token));
          localStorage.setItem('token', token);
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = loginSlice;


////////////////////////////////////////////slice to manage the token state
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  },
  reducers: {
    clearToken: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setToken, (state, action) => {
      state.token = action.payload;
    });
  },
});

export const { clearToken } = authSlice.actions;
export const authReducer = authSlice.reducer;