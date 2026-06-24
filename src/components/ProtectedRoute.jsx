/**
 * ProtectedRoute Component
 * 
 * Wraps routes that require authentication. If the user is not logged in,
 * they are redirected to the login page.
 * 
 * React Router Concepts:
 * - Navigate: Programmatic redirect component
 * - Outlet: Renders child routes (used in layout patterns)
 */

import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FullPageSpinner } from './ui/Spinner';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuth();

  // Show loading spinner while checking auth status on initial load
  if (!isInitialized) {
    return <FullPageSpinner />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected content
  return children;
};

export default ProtectedRoute;
