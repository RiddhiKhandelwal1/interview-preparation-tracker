/**
 * ProblemList Component
 * 
 * Main problem list with client-side filtering and sorting.
 * Demonstrates derived state: filtering Redux state in the component.
 */

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import ProblemCard from './ProblemCard';
import EmptyState from '../../components/ui/EmptyState';
import { difficultyOrder } from '../../utils/helpers';

const ProblemList = ({ onEdit, onAdd }) => {
  const { items: problems, filters } = useSelector((state) => state.problems);

  /**
   * useMemo: Memoizes the filtered/sorted results so they only
   * recompute when problems or filters change, not on every render.
   */
  const filteredProblems = useMemo(() => {
    let result = [...problems];

    // Apply search filter
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.topic?.toLowerCase().includes(search) ||
          p.notes?.toLowerCase().includes(search)
      );
    }

    // Apply difficulty filter
    if (filters.difficulty) {
      result = result.filter((p) => p.difficulty === filters.difficulty);
    }

    // Apply topic filter
    if (filters.topic) {
      result = result.filter((p) => p.topic === filters.topic);
    }

    // Apply platform filter
    if (filters.platform) {
      result = result.filter((p) => p.platform === filters.platform);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.$createdAt) - new Date(b.$createdAt));
        break;
      case 'difficulty-asc':
        result.sort((a, b) => difficultyOrder(a.difficulty) - difficultyOrder(b.difficulty));
        break;
      case 'difficulty-desc':
        result.sort((a, b) => difficultyOrder(b.difficulty) - difficultyOrder(a.difficulty));
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return result;
  }, [problems, filters]);

  if (problems.length === 0) {
    return (
      <EmptyState
        icon="📝"
        title="No problems yet"
        description="Start tracking your coding problems to see your progress."
        actionLabel="Add First Problem"
        onAction={onAdd}
      />
    );
  }

  if (filteredProblems.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="No matching problems"
        description="Try adjusting your filters or search query."
      />
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500">
        Showing {filteredProblems.length} of {problems.length} problems
      </p>
      <div className="grid gap-3">
        {filteredProblems.map((problem) => (
          <ProblemCard key={problem.$id} problem={problem} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
};

export default ProblemList;
