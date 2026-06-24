/**
 * FilterBar Component
 * 
 * Search and filter controls for the problem list.
 * Dispatches Redux actions for client-side filtering.
 */

import { useDispatch, useSelector } from 'react-redux';
import { setFilter, clearFilters } from '../../redux/slices/problemSlice';
import SearchInput from '../../components/ui/SearchInput';
import Button from '../../components/ui/Button';
import { DIFFICULTIES, PLATFORMS, TOPICS, SORT_OPTIONS } from '../../utils/constants';

const FilterBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.problems.filters);

  const selectClasses =
    'rounded-xl border border-gray-800 bg-gray-900/50 px-3 py-2.5 text-sm text-gray-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors';

  const hasActiveFilters = filters.search || filters.difficulty || filters.topic || filters.platform;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <SearchInput
          value={filters.search}
          onChange={(val) => dispatch(setFilter({ key: 'search', value: val }))}
          placeholder="Search problems..."
          className="w-full sm:w-64"
        />

        {/* Difficulty Filter */}
        <select
          value={filters.difficulty}
          onChange={(e) => dispatch(setFilter({ key: 'difficulty', value: e.target.value }))}
          className={selectClasses}
        >
          <option value="">All Difficulties</option>
          {DIFFICULTIES.map((d) => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>

        {/* Topic Filter */}
        <select
          value={filters.topic}
          onChange={(e) => dispatch(setFilter({ key: 'topic', value: e.target.value }))}
          className={selectClasses}
        >
          <option value="">All Topics</option>
          {TOPICS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {/* Platform Filter */}
        <select
          value={filters.platform}
          onChange={(e) => dispatch(setFilter({ key: 'platform', value: e.target.value }))}
          className={selectClasses}
        >
          <option value="">All Platforms</option>
          {PLATFORMS.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={filters.sortBy}
          onChange={(e) => dispatch(setFilter({ key: 'sortBy', value: e.target.value }))}
          className={selectClasses}
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={() => dispatch(clearFilters())}>
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
