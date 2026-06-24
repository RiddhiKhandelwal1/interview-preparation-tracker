/**
 * useAuth Hook — convenient access to auth state and actions.
 */
import { useSelector, useDispatch } from 'react-redux';
import { login, signup, logout, getCurrentUser, clearError } from '../redux/slices/authSlice';
import { useCallback } from 'react';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, status, error, isInitialized } = useSelector((state) => state.auth);

  return {
    user,
    isAuthenticated: !!user,
    isLoading: status === 'loading',
    error,
    isInitialized,
    login: useCallback((c) => dispatch(login(c)), [dispatch]),
    signup: useCallback((d) => dispatch(signup(d)), [dispatch]),
    logout: useCallback(() => dispatch(logout()), [dispatch]),
    checkAuth: useCallback(() => dispatch(getCurrentUser()), [dispatch]),
    clearError: useCallback(() => dispatch(clearError()), [dispatch]),
  };
};

export default useAuth;
