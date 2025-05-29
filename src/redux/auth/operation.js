import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk('/auth/user', async (_, thunkAPI) => {
  try {
    const { data } = await axios.post('/auth/user');
    return data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message,
    );
  }
});
export const getUserById = createAsyncThunk(
  '/auth/userId',
  async (userId, thunkAPI) => {
    try {
      console.log('userId okokok', userId);
      const { data } = await axios.post('/auth/user', { userId });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const getUsers = createAsyncThunk('/auth/users', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get('/auth/users');
    return data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message,
    );
  }
});

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/auth/login', credentials);

      // Store token
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axios.post('/auth/logout');
      localStorage.removeItem('token');
      return {};
    } catch (error) {
      // Even if logout fails on backend, clear local storage
      localStorage.removeItem('token');
      return {};
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post('/auth/register', userData);

      // Store token if provided
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
