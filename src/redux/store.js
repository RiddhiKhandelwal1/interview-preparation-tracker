/**
 * Redux Store Configuration
 * 
 * Redux Toolkit's configureStore simplifies store setup by:
 * 1. Automatically combining slice reducers
 * 2. Adding Redux DevTools Extension support
 * 3. Including redux-thunk middleware by default
 * 4. Adding development-only middleware for common mistakes
 * 
 * This is the single source of truth for the entire app's state.
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import problemReducer from './slices/problemSlice';
import noteReducer from './slices/noteSlice';
import interviewReducer from './slices/interviewSlice';
import resumeReducer from './slices/resumeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,           // state.auth
    problems: problemReducer,    // state.problems
    notes: noteReducer,          // state.notes
    interviews: interviewReducer, // state.interviews
    resumes: resumeReducer,      // state.resumes
  },
  // Redux Toolkit includes thunk middleware by default.
  // DevTools are enabled automatically in development.
});

export default store;
