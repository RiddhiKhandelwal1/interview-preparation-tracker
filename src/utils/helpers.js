/**
 * Utility Helper Functions
 * 
 * Pure utility functions used across the application.
 * These are stateless and side-effect-free.
 */

import { format, formatDistanceToNow, differenceInCalendarDays, parseISO, isValid } from 'date-fns';

/**
 * Format an ISO date string into a human-readable format.
 * @param {string} dateStr - ISO date string
 * @param {string} formatStr - date-fns format string (default: 'MMM dd, yyyy')
 * @returns {string} Formatted date
 */
export const formatDate = (dateStr, formatStr = 'MMM dd, yyyy') => {
  if (!dateStr) return '—';
  const date = parseISO(dateStr);
  return isValid(date) ? format(date, formatStr) : '—';
};

/**
 * Get relative time from now (e.g., "2 hours ago").
 * @param {string} dateStr - ISO date string
 * @returns {string} Relative time string
 */
export const timeAgo = (dateStr) => {
  if (!dateStr) return '—';
  const date = parseISO(dateStr);
  return isValid(date) ? formatDistanceToNow(date, { addSuffix: true }) : '—';
};

/**
 * Calculate daily streak from an array of solved dates.
 * A streak counts consecutive days (ending today or yesterday) with at least one solve.
 * @param {string[]} dates - Array of ISO date strings
 * @returns {number} Current streak count
 */
export const calculateStreak = (dates) => {
  if (!dates || dates.length === 0) return 0;

  // Get unique dates sorted descending
  const uniqueDates = [...new Set(
    dates
      .map((d) => {
        const parsed = parseISO(d);
        return isValid(parsed) ? format(parsed, 'yyyy-MM-dd') : null;
      })
      .filter(Boolean)
  )].sort().reverse();

  if (uniqueDates.length === 0) return 0;

  const today = format(new Date(), 'yyyy-MM-dd');
  const yesterday = format(new Date(Date.now() - 86400000), 'yyyy-MM-dd');

  // Streak must start from today or yesterday
  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const diff = differenceInCalendarDays(parseISO(uniqueDates[i - 1]), parseISO(uniqueDates[i]));
    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

/**
 * Calculate statistics from an array of problems.
 * @param {Array} problems - Array of problem documents
 * @returns {Object} Stats object
 */
export const calculateStats = (problems) => {
  const total = problems.length;
  const solved = problems.filter((p) => p.solved).length;
  const easy = problems.filter((p) => p.difficulty === 'easy' && p.solved).length;
  const medium = problems.filter((p) => p.difficulty === 'medium' && p.solved).length;
  const hard = problems.filter((p) => p.difficulty === 'hard' && p.solved).length;

  return { total, solved, easy, medium, hard, unsolved: total - solved };
};

/**
 * Group problems by a specific field.
 * @param {Array} problems - Array of problem documents
 * @param {string} field - Field name to group by
 * @returns {Object} Grouped counts { [value]: count }
 */
export const groupBy = (problems, field) => {
  return problems.reduce((acc, problem) => {
    const key = problem[field] || 'Unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
};

/**
 * Get the difficulty sort order for sorting problems.
 * @param {string} difficulty - Difficulty string
 * @returns {number} Sort weight
 */
export const difficultyOrder = (difficulty) => {
  const order = { easy: 1, medium: 2, hard: 3 };
  return order[difficulty] || 0;
};

/**
 * Truncate a string to a given length with ellipsis.
 * @param {string} str - Input string
 * @param {number} maxLen - Maximum length (default: 100)
 * @returns {string} Truncated string
 */
export const truncate = (str, maxLen = 100) => {
  if (!str) return '';
  return str.length > maxLen ? str.substring(0, maxLen) + '…' : str;
};
