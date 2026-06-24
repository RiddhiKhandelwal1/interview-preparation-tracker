/**
 * Redux Store — configureStore combines all slices and adds middleware.
 */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import problemReducer from './slices/problemSlice';
import noteReducer from './slices/noteSlice';
import interviewReducer from './slices/interviewSlice';
import resumeReducer from './slices/resumeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    problems: problemReducer,
    notes: noteReducer,
    interviews: interviewReducer,
    resumes: resumeReducer,
  },
});

export default store;
