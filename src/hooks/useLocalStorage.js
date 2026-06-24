/**
 * useLocalStorage Hook
 * 
 * Syncs a piece of state with localStorage for persistence across
 * page refreshes. Useful for user preferences like sidebar collapse state.
 * 
 * React Hooks Concepts:
 * - Lazy initialization: useState accepts a function that runs only on first render
 * - useEffect: Syncs state changes to localStorage
 */

import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Lazy initialization — this function only runs once on mount
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Sync to localStorage whenever the value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
