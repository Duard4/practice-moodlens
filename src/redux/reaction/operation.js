// reactionThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addOrUpdateReaction = createAsyncThunk(
  'reactions/upsert',
  async (reactionData, thunkAPI) => {
    try {
      const { data } = await axios.put('/reactions', reactionData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const removeReaction = createAsyncThunk(
  'reactions/delete',
  async ({ userId, targetId, targetType }, thunkAPI) => {
    try {
      // Fixed: Use URL parameter for targetId as per backend route
      const { data } = await axios.delete(`/reactions/${targetId}`);
      return { userId, targetId, targetType };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
