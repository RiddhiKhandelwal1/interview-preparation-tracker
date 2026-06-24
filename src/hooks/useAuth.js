/**
 * useAuth Hook
 * 
 * Custom hook that provides convenient access to auth state and actions.
 * 
 * React Hooks Concept:
 * Custom hooks extract reusable stateful logic into a function.
 * They must start with "use" and can call other hooks internally.
 * This hook wraps useSelector (read state) and useDispatch (trigger actions).
 */

import { useSelector, useDispatch } from 'react-redux';
import { login, signup, logout, getCurrentUser, clearError } from '../redux/slices/authSlice';
import { useCallback } from 'react';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, status, error, isInitialized } = useSelector((state) => state.auth);

  // useCallback memoizes these functions so they don't change on every render
  const handleLogin = useCallback(
    (credentials) => dispatch(login(credentials)),
    [dispatch]
  );

  const handleSignup = useCallback(
    (userData) => dispatch(signup(userData)),
    [dispatch]
  );

  const handleLogout = useCallback(
    () => dispatch(logout()),
    [dispatch]
  );

  const checkAuth = useCallback(
    () => dispatch(getCurrentUser()),
    [dispatch]
  );

  const handleClearError = useCallback(
    () => dispatch(clearError()),
    [dispatch]
  );

  return {
    user,
    isAuthenticated: !!user,
    isLoading: status === 'loading',
    error,
    isInitialized,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    checkAuth,
    clearError: handleClearError,
  };
};

export default useAuth;
