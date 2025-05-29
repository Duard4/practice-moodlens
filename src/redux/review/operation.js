import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://sentiment-back.onrender.com';

// Get all reviews with comprehensive filtering, sorting, and search
export const getReviews = createAsyncThunk(
  'review/getReviews',
  async (params = {}, { rejectWithValue }) => {
    try {
      const {
        page = 1,
        perPage = 10,
        sortBy = 'createdAt',
        sortOrder = 'asc',
        filters = {},
        userId,
        ...otherParams
      } = params;

      const queryParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
        sortBy,
        sortOrder,
        ...otherParams,
      });

      // Add all filters to query params
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value) && value.length > 0) {
            queryParams.set(key, value.join(','));
          } else if (!Array.isArray(value)) {
            queryParams.set(key, value.toString());
          }
        }
      });

      // Add userId if provided
      if (userId) {
        queryParams.set('userId', userId);
      }

      const { data } = await axios.get(`/reviews?${queryParams.toString()}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch reviews',
      );
    }
  },
);

export const getTopMoviesBySentiment = createAsyncThunk(
  '/reviews/topbysentiment',
  async (__dirname, thunkAPI) => {
    try {
      const { data } = await axios.get(`/reviews/topbysentiment`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const getTopMoviesByReviews = createAsyncThunk(
  '/reviews/topbyreviews',
  async (__dirname, thunkAPI) => {
    try {
      const { data } = await axios.get(`/reviews/topbyreviews`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const getReview = createAsyncThunk(
  '/reviews/:id',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`/reviews/${id}`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const addReview = createAsyncThunk(
  '/reviews/add',
  async (reviewData, thunkAPI) => {
    try {
      const { data } = await axios.post(`/reviews/`, reviewData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const updateReview = createAsyncThunk(
  '/reviews/update',
  async (reviewData, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/reviews/`, reviewData);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
export const deleteReview = createAsyncThunk(
  '/reviews/delete',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/reviews/${id}`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
export const addReviewFeedback = createAsyncThunk(
  '/reviews/feedback',
  async (reviewData, thunkAPI) => {
    try {
      const { data } = await axios.put(`/feedback`, reviewData);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
