/**
 * Application Constants
 * Centralized constants used across the app.
 */

export const DIFFICULTIES = [
  { value: 'easy', label: 'Easy', color: 'bg-emerald-500', textColor: 'text-emerald-500', bgLight: 'bg-emerald-500/10' },
  { value: 'medium', label: 'Medium', color: 'bg-amber-500', textColor: 'text-amber-500', bgLight: 'bg-amber-500/10' },
  { value: 'hard', label: 'Hard', color: 'bg-rose-500', textColor: 'text-rose-500', bgLight: 'bg-rose-500/10' },
];

export const PLATFORMS = [
  { value: 'leetcode', label: 'LeetCode', color: '#FFA116' },
  { value: 'codeforces', label: 'Codeforces', color: '#3B82F6' },
  { value: 'gfg', label: 'GeeksforGeeks', color: '#10B981' },
  { value: 'interviewbit', label: 'InterviewBit', color: '#F97316' },
];

export const TOPICS = [
  'Arrays', 'Strings', 'Linked List', 'Stack', 'Queue', 'Trees', 'Graphs',
  'Dynamic Programming', 'Greedy', 'Backtracking', 'Binary Search', 'Sorting',
  'Hashing', 'Heap', 'Trie', 'Sliding Window', 'Two Pointers',
  'Bit Manipulation', 'Math', 'Recursion', 'Matrix', 'Segment Tree', 'Disjoint Set',
];

// Icon names correspond to lucide-react icon component names
export const INTERVIEW_STATUSES = [
  { value: 'applied', label: 'Applied', color: 'bg-blue-500', iconName: 'Send' },
  { value: 'oa', label: 'Online Assessment', color: 'bg-purple-500', iconName: 'Monitor' },
  { value: 'interview', label: 'Interview', color: 'bg-amber-500', iconName: 'Target' },
  { value: 'rejected', label: 'Rejected', color: 'bg-rose-500', iconName: 'XCircle' },
  { value: 'offer', label: 'Offer', color: 'bg-emerald-500', iconName: 'Trophy' },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'difficulty-asc', label: 'Difficulty: Easy → Hard' },
  { value: 'difficulty-desc', label: 'Difficulty: Hard → Easy' },
  { value: 'name-asc', label: 'Name: A → Z' },
  { value: 'name-desc', label: 'Name: Z → A' },
];

export const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/problems', label: 'Problems', icon: 'Code2' },
  { path: '/notes', label: 'Notes', icon: 'StickyNote' },
  { path: '/interviews', label: 'Interviews', icon: 'Briefcase' },
  { path: '/resumes', label: 'Resumes', icon: 'FileText' },
  { path: '/analytics', label: 'Analytics', icon: 'BarChart3' },
];
