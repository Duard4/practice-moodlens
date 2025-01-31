import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  selectedReasons: [],
  reviewId: null,
};

const complaintSlice = createSlice({
  name: 'complaint',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.reviewId = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.selectedReasons = [];
      state.reviewId = null;
    },
    toggleReason: (state, action) => {
      const reasonId = action.payload;
      if (state.selectedReasons.includes(reasonId)) {
        state.selectedReasons = state.selectedReasons.filter(
          (id) => id !== reasonId,
        );
      } else {
        state.selectedReasons.push(reasonId);
      }
    },
    submitComplaint: (state) => {
      console.log('Submitting complaint for review:', state.reviewId);
      console.log('Selected Reasons:', state.selectedReasons.flat());
      state.isModalOpen = false;
      state.selectedReasons = [];
      state.reviewId = null;
    },
  },
});

export const { openModal, closeModal, toggleReason, submitComplaint } =
  complaintSlice.actions;

export default complaintSlice.reducer;
