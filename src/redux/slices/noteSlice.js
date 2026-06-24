/**
 * Note Slice — Redux Toolkit
 * 
 * Manages notes state with CRUD async thunks.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteService from '../../services/noteService';

// ─── Async Thunks ─────────────────────────────────────────────────────────────

export const fetchNotes = createAsyncThunk(
  'notes/fetchAll',
  async (userId, { rejectWithValue }) => {
    try {
      return await noteService.getNotes(userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNote = createAsyncThunk(
  'notes/add',
  async (data, { rejectWithValue }) => {
    try {
      return await noteService.createNote(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateNote = createAsyncThunk(
  'notes/update',
  async ({ noteId, data }, { rejectWithValue }) => {
    try {
      return await noteService.updateNote(noteId, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteNote = createAsyncThunk(
  'notes/delete',
  async (noteId, { rejectWithValue }) => {
    try {
      return await noteService.deleteNote(noteId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.items.findIndex((n) => n.$id === action.payload.$id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.items = state.items.filter((n) => n.$id !== action.payload);
      });
  },
});

export default noteSlice.reducer;
