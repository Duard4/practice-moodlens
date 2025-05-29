import { createSlice } from '@reduxjs/toolkit';
import {
  addComment,
  deleteContact,
  getComments,
  updateContact,
} from './operation';

const initialState = {
  comments: [],
  loading: false,
  error: null,
  success: false,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    resetCommentState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    // Get comments
    builder.addCase(getComments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    });
    builder.addCase(getComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Add comment
    builder.addCase(addComment.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.loading = false;
      state.comments.push(action.payload);
      state.success = true;
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    // Update comment
    builder.addCase(updateContact.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(updateContact.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = state.comments.map((comment) =>
        comment._id === action.payload._id ? action.payload : comment,
      );
      state.success = true;
    });
    builder.addCase(updateContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    // Delete comment
    builder.addCase(deleteContact.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload._id,
      );
      state.success = true;
    });
    builder.addCase(deleteContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export const { resetCommentState, clearComments } = commentSlice.actions;
export default commentSlice.reducer;
