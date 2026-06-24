/**
 * useDebounce Hook
 * 
 * Delays updating a value until the user stops changing it for a
 * specified duration. Essential for search inputs to avoid
 * firing API calls on every keystroke.
 * 
 * React Hooks Concepts:
 * - useState: Stores the debounced value
 * - useEffect: Sets up a timer that resets on every value change
 * - Cleanup function: Clears the previous timer to prevent stale updates
 */

import { useState, useEffect } from 'react';

const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: clear the timer if value changes before delay completes
    // This is what makes it a "debounce" — only the last value gets through
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
