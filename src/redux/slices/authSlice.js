/**
 * Auth Slice — Redux Toolkit
 * Manages authentication state with createAsyncThunk for Appwrite API calls.
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

export const signup = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
  try { return await authService.signup(userData); }
  catch (error) { return rejectWithValue(error.message || 'Signup failed'); }
});

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try { return await authService.login(credentials); }
  catch (error) { return rejectWithValue(error.message || 'Login failed'); }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try { await authService.logout(); }
  catch (error) { return rejectWithValue(error.message || 'Logout failed'); }
});

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, { rejectWithValue }) => {
  try { return await authService.getCurrentUser(); }
  catch (error) { return rejectWithValue(error.message); }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle', error: null, isInitialized: false },
  reducers: {
    clearError(state) { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(signup.fulfilled, (state, action) => { state.status = 'succeeded'; state.user = action.payload; })
      .addCase(signup.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      .addCase(login.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { state.status = 'succeeded'; state.user = action.payload; })
      .addCase(login.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      .addCase(logout.fulfilled, (state) => { state.user = null; state.status = 'idle'; })
      .addCase(getCurrentUser.pending, (state) => { state.status = 'loading'; })
      .addCase(getCurrentUser.fulfilled, (state, action) => { state.status = 'succeeded'; state.user = action.payload; state.isInitialized = true; })
      .addCase(getCurrentUser.rejected, (state) => { state.status = 'failed'; state.user = null; state.isInitialized = true; });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
