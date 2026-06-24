/**
 * Problem Slice — Redux Toolkit
 * CRUD operations + client-side filtering/searching.
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import problemService from '../../services/problemService';

export const fetchProblems = createAsyncThunk('problems/fetchAll', async (userId, { rejectWithValue }) => {
  try { return await problemService.getProblems(userId); } catch (error) { return rejectWithValue(error.message); }
});
export const addProblem = createAsyncThunk('problems/add', async (data, { rejectWithValue }) => {
  try { return await problemService.createProblem(data); } catch (error) { return rejectWithValue(error.message); }
});
export const updateProblem = createAsyncThunk('problems/update', async ({ problemId, data }, { rejectWithValue }) => {
  try { return await problemService.updateProblem(problemId, data); } catch (error) { return rejectWithValue(error.message); }
});
export const deleteProblem = createAsyncThunk('problems/delete', async (problemId, { rejectWithValue }) => {
  try { return await problemService.deleteProblem(problemId); } catch (error) { return rejectWithValue(error.message); }
});

const problemSlice = createSlice({
  name: 'problems',
  initialState: {
    items: [], status: 'idle', error: null,
    filters: { search: '', difficulty: '', topic: '', platform: '', sortBy: 'newest' },
  },
  reducers: {
    setFilter(state, action) { const { key, value } = action.payload; state.filters[key] = value; },
    clearFilters(state) { state.filters = { search: '', difficulty: '', topic: '', platform: '', sortBy: 'newest' }; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProblems.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchProblems.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload; })
      .addCase(fetchProblems.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      .addCase(addProblem.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(updateProblem.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.$id === action.payload.$id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteProblem.fulfilled, (state, action) => { state.items = state.items.filter((p) => p.$id !== action.payload); });
  },
});

export const { setFilter, clearFilters } = problemSlice.actions;
export default problemSlice.reducer;
