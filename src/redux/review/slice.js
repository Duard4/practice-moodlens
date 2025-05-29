// reviewSlice.js - Updated slice with pagination and sentiment stats
import { createSlice } from '@reduxjs/toolkit';
import {
  addReview,
  deleteReview,
  getReview,
  getReviews,
  getTopMoviesByReviews,
  getTopMoviesBySentiment,
  updateReview,
} from './operation';

const initialState = {
  reviews: [],
  topMoviesByReviews: [],
  topMoviesBySentiment: [],
  sentimentStats: {
    positive: 0,
    neutral: 0,
    negative: 0,
    null: 0,
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
  addedReview: null,
  currentReview: null,
  loading: false,
  error: null,
  success: false,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    resetReviewState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearCurrentReview: (state) => {
      state.currentReview = null;
    },
    resetReviews: (state) => {
      state.reviews = [];
      state.sentimentStats = {
        positive: 0,
        neutral: 0,
        negative: 0,
        null: 0,
      };
      state.pagination = {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        hasNextPage: false,
        hasPrevPage: false,
      };
    },
  },
  extraReducers: (builder) => {
    // Get all reviews
    builder
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews || [];
        state.sentimentStats =
          action.payload.sentimentStats || state.sentimentStats;
        state.pagination = {
          currentPage: action.payload.currentPage || 1,
          totalPages: action.payload.totalPages || 1,
          totalItems: action.payload.totalItems || 0,
          hasNextPage: action.payload.hasNextPage || false,
          hasPrevPage: action.payload.hasPrevPage || false,
        };
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get single review
      .addCase(getReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReview = action.payload;
      })
      .addCase(getReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add review
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.addedReview = action.payload;
        state.success = true;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Update review
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        state.addedReview = { data: action.payload.review };
        state.success = true;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Delete review
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(getTopMoviesByReviews.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopMoviesByReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.topMoviesByReviews = action.payload.movies;
      })
      .addCase(getTopMoviesByReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTopMoviesBySentiment.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopMoviesBySentiment.fulfilled, (state, action) => {
        state.loading = false;
        state.topMoviesBySentiment = action.payload.movies;
      })
      .addCase(getTopMoviesBySentiment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetReviewState, clearCurrentReview, resetReviews } =
  reviewSlice.actions;
export default reviewSlice.reducer;
