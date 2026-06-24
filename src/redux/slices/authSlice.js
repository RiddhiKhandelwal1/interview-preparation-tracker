/**
 * Auth Slice — Redux Toolkit
 * 
 * Manages authentication state using createSlice and createAsyncThunk.
 * 
 * Redux Toolkit Concepts:
 * - createAsyncThunk: Creates thunks that dispatch pending/fulfilled/rejected actions
 * - createSlice: Combines reducers, actions, and initial state in one place
 * - extraReducers (builder): Handles async thunk lifecycle actions
 * - rejectWithValue: Returns a custom error payload instead of serializing the thrown error
 * - Immer: Redux Toolkit uses Immer internally, so we can "mutate" state directly
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

// ─── Async Thunks ─────────────────────────────────────────────────────────────

/**
 * Signup thunk — creates account and logs in.
 * The string 'auth/signup' becomes the action type prefix:
 *   - auth/signup/pending
 *   - auth/signup/fulfilled
 *   - auth/signup/rejected
 */
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      return await authService.signup(userData);
    } catch (error) {
      // rejectWithValue sends a clean error message to the rejected case
      return rejectWithValue(error.message || 'Signup failed');
    }
  }
);

/**
 * Login thunk — creates a session with email/password.
 */
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

/**
 * Logout thunk — destroys the current session.
 */
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

/**
 * Get current user thunk — used on app startup to restore session.
 * If no session exists, Appwrite returns null (handled in the service).
 */
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      return await authService.getCurrentUser();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,           // Current user object from Appwrite
    status: 'idle',       // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,          // Error message string
    isInitialized: false, // Whether we've checked for an existing session
  },
  // Synchronous reducers (no API call needed)
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  // Async thunk lifecycle reducers using the builder callback pattern
  extraReducers: (builder) => {
    builder
      // ─── Signup ──────────────────────────────────
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // ─── Login ───────────────────────────────────
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // ─── Logout ──────────────────────────────────
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle';
      })
      // ─── Get Current User ────────────────────────
      .addCase(getCurrentUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isInitialized = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.status = 'failed';
        state.user = null;
        state.isInitialized = true;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
