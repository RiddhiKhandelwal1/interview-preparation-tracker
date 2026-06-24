/**
 * Problem Slice — Redux Toolkit
 * 
 * Manages the problems state including CRUD operations and client-side
 * filtering/searching. Demonstrates the pattern of separating:
 * - Async thunks (server communication via Appwrite)
 * - Synchronous reducers (client-side filters, search, sort)
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import problemService from '../../services/problemService';

// ─── Async Thunks ─────────────────────────────────────────────────────────────

export const fetchProblems = createAsyncThunk(
  'problems/fetchAll',
  async (userId, { rejectWithValue }) => {
    try {
      return await problemService.getProblems(userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addProblem = createAsyncThunk(
  'problems/add',
  async (data, { rejectWithValue }) => {
    try {
      return await problemService.createProblem(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProblem = createAsyncThunk(
  'problems/update',
  async ({ problemId, data }, { rejectWithValue }) => {
    try {
      return await problemService.updateProblem(problemId, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProblem = createAsyncThunk(
  'problems/delete',
  async (problemId, { rejectWithValue }) => {
    try {
      return await problemService.deleteProblem(problemId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const problemSlice = createSlice({
  name: 'problems',
  initialState: {
    items: [],           // All problems from Appwrite
    status: 'idle',      // Loading state
    error: null,
    // Client-side filter state (does not trigger API calls)
    filters: {
      search: '',
      difficulty: '',
      topic: '',
      platform: '',
      sortBy: 'newest',
    },
  },
  // Synchronous reducers for client-side filtering
  reducers: {
    setFilter(state, action) {
      // action.payload = { key: 'difficulty', value: 'easy' }
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    clearFilters(state) {
      state.filters = {
        search: '',
        difficulty: '',
        topic: '',
        platform: '',
        sortBy: 'newest',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Fetch All ──────────────────────────────
      .addCase(fetchProblems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProblems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProblems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // ─── Add ────────────────────────────────────
      .addCase(addProblem.fulfilled, (state, action) => {
        // Prepend new problem to the front of the list
        state.items.unshift(action.payload);
      })
      // ─── Update ─────────────────────────────────
      .addCase(updateProblem.fulfilled, (state, action) => {
        // Find and replace the updated problem in the list
        const index = state.items.findIndex((p) => p.$id === action.payload.$id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // ─── Delete ─────────────────────────────────
      .addCase(deleteProblem.fulfilled, (state, action) => {
        // Remove the deleted problem from the list by ID
        state.items = state.items.filter((p) => p.$id !== action.payload);
      });
  },
});

export const { setFilter, clearFilters } = problemSlice.actions;
export default problemSlice.reducer;
