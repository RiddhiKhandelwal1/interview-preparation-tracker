/**
 * Utility Helper Functions — pure, stateless, side-effect-free.
 */

import { format, formatDistanceToNow, differenceInCalendarDays, parseISO, isValid } from 'date-fns';

export const formatDate = (dateStr, formatStr = 'MMM dd, yyyy') => {
  if (!dateStr) return '—';
  const date = parseISO(dateStr);
  return isValid(date) ? format(date, formatStr) : '—';
};

export const timeAgo = (dateStr) => {
  if (!dateStr) return '—';
  const date = parseISO(dateStr);
  return isValid(date) ? formatDistanceToNow(date, { addSuffix: true }) : '—';
};

export const calculateStreak = (dates) => {
  if (!dates || dates.length === 0) return 0;
  const uniqueDates = [...new Set(
    dates.map((d) => { const p = parseISO(d); return isValid(p) ? format(p, 'yyyy-MM-dd') : null; }).filter(Boolean)
  )].sort().reverse();
  if (uniqueDates.length === 0) return 0;
  const today = format(new Date(), 'yyyy-MM-dd');
  const yesterday = format(new Date(Date.now() - 86400000), 'yyyy-MM-dd');
  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) return 0;
  let streak = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    if (differenceInCalendarDays(parseISO(uniqueDates[i - 1]), parseISO(uniqueDates[i])) === 1) streak++;
    else break;
  }
  return streak;
};

export const calculateStats = (problems) => {
  const total = problems.length;
  const solved = problems.filter((p) => p.solved).length;
  const easy = problems.filter((p) => p.difficulty === 'easy' && p.solved).length;
  const medium = problems.filter((p) => p.difficulty === 'medium' && p.solved).length;
  const hard = problems.filter((p) => p.difficulty === 'hard' && p.solved).length;
  return { total, solved, easy, medium, hard, unsolved: total - solved };
};

export const groupBy = (problems, field) => {
  return problems.reduce((acc, p) => { const key = p[field] || 'Unknown'; acc[key] = (acc[key] || 0) + 1; return acc; }, {});
};

export const difficultyOrder = (d) => ({ easy: 1, medium: 2, hard: 3 }[d] || 0);

export const truncate = (str, maxLen = 100) => {
  if (!str) return '';
  return str.length > maxLen ? str.substring(0, maxLen) + '…' : str;
};
