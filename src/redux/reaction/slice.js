// reactionSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { addOrUpdateReaction, removeReaction } from './operation';

const initialState = {
  reactions: {}, // Format: { "userId-targetId": "like" | "dislike" }
  loading: false,
  error: null,
  success: false,
};

const reactionSlice = createSlice({
  name: 'reaction',
  initialState,
  reducers: {
    resetReactionState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    // Action to set initial reactions (e.g., when loading a page)
    setInitialReactions: (state, action) => {
      state.reactions = { ...state.reactions, ...action.payload };
    },
    // Action to clear all reactions
    clearReactions: (state) => {
      state.reactions = {};
    },
  },
  extraReducers: (builder) => {
    // Add/Update reaction
    builder.addCase(addOrUpdateReaction.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(addOrUpdateReaction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;

      // Extract data from backend response structure
      const reactionData = action.payload.data || action.payload;
      const { userId, targetId, reactionType } = reactionData;

      // Store reaction in state
      state.reactions[`${userId}-${targetId}`] = reactionType;
    });
    builder.addCase(addOrUpdateReaction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to add/update reaction';
      state.success = false;
    });

    // Remove reaction
    builder.addCase(removeReaction.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(removeReaction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;

      // Get data from the thunk return (since DELETE returns 204 with no body)
      const { userId, targetId } = action.payload;

      // Remove reaction from state
      delete state.reactions[`${userId}-${targetId}`];
    });
    builder.addCase(removeReaction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to remove reaction';
      state.success = false;
    });
  },
});

export const { resetReactionState, setInitialReactions, clearReactions } =
  reactionSlice.actions;

// Selectors
export const selectReactionByUserAndTarget = (state, userId, targetId) => {
  return state.reaction.reactions[`${userId}-${targetId}`] || null;
};

export const selectReactionLoading = (state) => state.reaction.loading;
export const selectReactionError = (state) => state.reaction.error;
export const selectReactionSuccess = (state) => state.reaction.success;

export default reactionSlice.reducer;
