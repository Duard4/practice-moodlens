import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getComments = createAsyncThunk(
  '/comments/',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`/comments/${id}`);
      return data.data.comments;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const addComment = createAsyncThunk(
  '/comments/:id/add',
  async (commentData, thunkAPI) => {
    try {
      const { data } = await axios.post(`/comments/`, {
        targetType: commentData.targetType,
        targetId: commentData.targetId,
        comment: commentData.comment,
      });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const updateContact = createAsyncThunk(
  '/comments/:id/update',
  async ({ id, comment }, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/comments/${id}`, {
        comment,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const deleteContact = createAsyncThunk(
  '/comments/:id/delete',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.post(`/comments/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
