import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import resumeService from '../../services/resumeService';

export const fetchResumes = createAsyncThunk('resumes/fetchAll', async (userId, { rejectWithValue }) => {
  try { return await resumeService.getResumes(userId); } catch (error) { return rejectWithValue(error.message); }
});
export const uploadResume = createAsyncThunk('resumes/upload', async (data, { rejectWithValue }) => {
  try { return await resumeService.uploadResume(data); } catch (error) { return rejectWithValue(error.message); }
});
export const deleteResume = createAsyncThunk('resumes/delete', async ({ resumeId, fileId }, { rejectWithValue }) => {
  try { return await resumeService.deleteResume(resumeId, fileId); } catch (error) { return rejectWithValue(error.message); }
});

const resumeSlice = createSlice({
  name: 'resumes',
  initialState: { items: [], status: 'idle', uploadStatus: 'idle', error: null },
  reducers: { clearUploadStatus(state) { state.uploadStatus = 'idle'; } },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResumes.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchResumes.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload; })
      .addCase(fetchResumes.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      .addCase(uploadResume.pending, (state) => { state.uploadStatus = 'loading'; })
      .addCase(uploadResume.fulfilled, (state, action) => { state.uploadStatus = 'succeeded'; state.items.unshift(action.payload); })
      .addCase(uploadResume.rejected, (state, action) => { state.uploadStatus = 'failed'; state.error = action.payload; })
      .addCase(deleteResume.fulfilled, (state, action) => { state.items = state.items.filter((r) => r.$id !== action.payload); });
  },
});

export const { clearUploadStatus } = resumeSlice.actions;
export default resumeSlice.reducer;
