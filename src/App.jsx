/**
 * App.jsx — Root Component
 * 
 * Sets up React Router with all routes.
 * 
 * React Router Concepts:
 * - BrowserRouter: Uses the HTML5 History API for clean URLs
 * - Routes: Container for Route definitions
 * - Route: Maps a URL path to a component
 * - ProtectedRoute: Custom wrapper that checks auth before rendering
 * 
 * React Hooks Concept:
 * - useEffect with empty deps: Runs once on mount to check auth session
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuth from './hooks/useAuth';
import { FullPageSpinner } from './components/ui/Spinner';
import ProtectedRoute from './components/ProtectedRoute';

// Page imports
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProblemsPage from './pages/ProblemsPage';
import NotesPage from './pages/NotesPage';
import InterviewsPage from './pages/InterviewsPage';
import ResumesPage from './pages/ResumesPage';
import AnalyticsPage from './pages/AnalyticsPage';

const App = () => {
  const { checkAuth, isInitialized, isAuthenticated } = useAuth();

  /**
   * On app startup, check if a valid Appwrite session exists.
   * This restores the user's login state across page refreshes.
   */
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Show loading spinner until initial auth check completes
  if (!isInitialized) {
    return <FullPageSpinner />;
  }

  return (
    <BrowserRouter>
      {/* Global toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#e5e7eb',
            border: '1px solid #374151',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#10b981', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />

      <Routes>
        {/* Public routes — redirect to dashboard if already logged in */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" replace /> : <SignupPage />}
        />

        {/* Protected routes — require authentication */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/problems"
          element={
            <ProtectedRoute>
              <ProblemsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NotesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interviews"
          element={
            <ProtectedRoute>
              <InterviewsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resumes"
          element={
            <ProtectedRoute>
              <ResumesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
