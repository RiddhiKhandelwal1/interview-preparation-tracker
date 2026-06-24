/**
 * Application Constants
 * 
 * Centralized constants used across the application.
 * Keeping these in one file prevents magic strings and makes
 * updates easy when adding new topics, platforms, etc.
 */

// Problem difficulty levels with display colors (Tailwind classes)
export const DIFFICULTIES = [
  { value: 'easy', label: 'Easy', color: 'bg-emerald-500', textColor: 'text-emerald-500', bgLight: 'bg-emerald-500/10' },
  { value: 'medium', label: 'Medium', color: 'bg-amber-500', textColor: 'text-amber-500', bgLight: 'bg-amber-500/10' },
  { value: 'hard', label: 'Hard', color: 'bg-rose-500', textColor: 'text-rose-500', bgLight: 'bg-rose-500/10' },
];

// Coding platforms
export const PLATFORMS = [
  { value: 'leetcode', label: 'LeetCode', icon: '🟡' },
  { value: 'codeforces', label: 'Codeforces', icon: '🔵' },
  { value: 'gfg', label: 'GeeksforGeeks', icon: '🟢' },
  { value: 'interviewbit', label: 'InterviewBit', icon: '🟠' },
];

// DSA topics for categorization
export const TOPICS = [
  'Arrays',
  'Strings',
  'Linked List',
  'Stack',
  'Queue',
  'Trees',
  'Graphs',
  'Dynamic Programming',
  'Greedy',
  'Backtracking',
  'Binary Search',
  'Sorting',
  'Hashing',
  'Heap',
  'Trie',
  'Sliding Window',
  'Two Pointers',
  'Bit Manipulation',
  'Math',
  'Recursion',
  'Matrix',
  'Segment Tree',
  'Disjoint Set',
];

// Interview application statuses with visual indicators
export const INTERVIEW_STATUSES = [
  { value: 'applied', label: 'Applied', color: 'bg-blue-500', icon: '📨' },
  { value: 'oa', label: 'Online Assessment', color: 'bg-purple-500', icon: '💻' },
  { value: 'interview', label: 'Interview', color: 'bg-amber-500', icon: '🎯' },
  { value: 'rejected', label: 'Rejected', color: 'bg-rose-500', icon: '❌' },
  { value: 'offer', label: 'Offer', color: 'bg-emerald-500', icon: '🎉' },
];

// Sort options for the problem list
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'difficulty-asc', label: 'Difficulty: Easy → Hard' },
  { value: 'difficulty-desc', label: 'Difficulty: Hard → Easy' },
  { value: 'name-asc', label: 'Name: A → Z' },
  { value: 'name-desc', label: 'Name: Z → A' },
];

// Navigation items for the sidebar
export const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/problems', label: 'Problems', icon: 'Code2' },
  { path: '/notes', label: 'Notes', icon: 'StickyNote' },
  { path: '/interviews', label: 'Interviews', icon: 'Briefcase' },
  { path: '/resumes', label: 'Resumes', icon: 'FileText' },
  { path: '/analytics', label: 'Analytics', icon: 'BarChart3' },
];
