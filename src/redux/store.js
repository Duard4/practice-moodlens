import { configureStore } from '@reduxjs/toolkit';
import complaintReducer from './complaintSlice';
import reviewReducer from './review/slice';
import commentReducer from './comment/slice';
import authReducer from './auth/slice';
import reactionReducer from './reaction/slice';
import axios from 'axios';

let token = '/jOtM6YfwkCqo/pm1NtqbHeFWtjO8hriPxtArHgC';

axios.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const store = configureStore({
  reducer: {
    complaint: complaintReducer,
    review: reviewReducer,
    comment: commentReducer,
    reaction: reactionReducer,
    auth: authReducer,
  },
});

export default store;
