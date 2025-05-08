// loginSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createAction, createSlice } from '@reduxjs/toolkit';

// Create an action to set the token
export const setToken = createAction('auth/setToken');
export const setUser = createAction('auth/setUser');

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
          dispatch(setUser(data.user));
          localStorage.setItem('token', token);
          // Store user data as JSON string
          localStorage.setItem('user', JSON.stringify(data.user));
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),
    ////////////////// logout mutation
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}`,
        },
      }),
      async onQueryStarted(_, { dispatch }) {
        dispatch(clearToken());
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = loginSlice;


////////////////////////////////////////////slice to manage the token state
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    clearToken: (state) => {
      state.token = null;
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setToken, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
  },
});

// Function to initialize auth state from localStorage
// Call this function after store is created
export const initializeAuthState = (store) => {
  if (typeof window !== 'undefined') {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      store.dispatch(setToken(token));
    }

    // Get user from localStorage
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        store.dispatch(setUser(user));
      }
    } catch (error) {
      console.error('Failed to parse user data from localStorage:', error);
    }
  }
};

export const { clearToken } = authSlice.actions;
export const authReducer = authSlice.reducer;