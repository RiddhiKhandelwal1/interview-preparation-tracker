import { useDispatch, useSelector } from 'react-redux';
import { setFilter, clearFilters } from '../../redux/slices/problemSlice';
import SearchInput from '../../components/ui/SearchInput';
import Button from '../../components/ui/Button';
import { DIFFICULTIES, PLATFORMS, TOPICS, SORT_OPTIONS } from '../../utils/constants';
import { X } from 'lucide-react';

const FilterBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.problems.filters);
  const selectCls = 'h-9 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 text-sm text-zinc-300 focus:border-zinc-600 focus:outline-none transition-colors cursor-pointer';
  const hasActive = filters.search || filters.difficulty || filters.topic || filters.platform;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <SearchInput value={filters.search} onChange={(v) => dispatch(setFilter({ key: 'search', value: v }))} placeholder="Search problems..." className="w-full sm:w-56" />
      <select value={filters.difficulty} onChange={(e) => dispatch(setFilter({ key: 'difficulty', value: e.target.value }))} className={selectCls}>
        <option value="">Difficulty</option>
        {DIFFICULTIES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
      </select>
      <select value={filters.topic} onChange={(e) => dispatch(setFilter({ key: 'topic', value: e.target.value }))} className={selectCls}>
        <option value="">Topic</option>
        {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <select value={filters.platform} onChange={(e) => dispatch(setFilter({ key: 'platform', value: e.target.value }))} className={selectCls}>
        <option value="">Platform</option>
        {PLATFORMS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
      </select>
      <select value={filters.sortBy} onChange={(e) => dispatch(setFilter({ key: 'sortBy', value: e.target.value }))} className={selectCls}>
        {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
      </select>
      {hasActive && (
        <Button variant="ghost" size="xs" onClick={() => dispatch(clearFilters())}>
          <X size={13} /> Clear
        </Button>
      )}
    </div>
  );
};

export default FilterBar;
