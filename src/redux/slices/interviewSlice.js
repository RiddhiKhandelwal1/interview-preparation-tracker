/**
 * Interview Slice — Redux Toolkit
 * 
 * Manages interview tracking state with CRUD operations.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import interviewService from '../../services/interviewService';

// ─── Async Thunks ─────────────────────────────────────────────────────────────

export const fetchInterviews = createAsyncThunk(
  'interviews/fetchAll',
  async (userId, { rejectWithValue }) => {
    try {
      return await interviewService.getInterviews(userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addInterview = createAsyncThunk(
  'interviews/add',
  async (data, { rejectWithValue }) => {
    try {
      return await interviewService.createInterview(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateInterview = createAsyncThunk(
  'interviews/update',
  async ({ interviewId, data }, { rejectWithValue }) => {
    try {
      return await interviewService.updateInterview(interviewId, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteInterview = createAsyncThunk(
  'interviews/delete',
  async (interviewId, { rejectWithValue }) => {
    try {
      return await interviewService.deleteInterview(interviewId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const interviewSlice = createSlice({
  name: 'interviews',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInterviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInterviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchInterviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addInterview.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateInterview.fulfilled, (state, action) => {
        const index = state.items.findIndex((i) => i.$id === action.payload.$id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteInterview.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.$id !== action.payload);
      });
  },
});

export default interviewSlice.reducer;
