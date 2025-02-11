// Redux/feedbackSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to handle feedback submission
export const submitFeedback = createAsyncThunk('feedback/submitFeedback', async ({ feedbackText, rating }) => {
    const response = await fetch('https://br-backend-server.vercel.app/api/user/submit-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ feedbackText, rating }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  
    const data = await response.json();
    return data;
  });

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: { status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitFeedback.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitFeedback.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default feedbackSlice.reducer;
