import { useSelector } from 'react-redux';
import ProblemCard from './ProblemCard';
import EmptyState from '../../components/ui/EmptyState';
import { difficultyOrder } from '../../utils/helpers';
import { Code2 } from 'lucide-react';

const ProblemList = ({ onEdit, onAdd }) => {
  const { items: problems, filters } = useSelector((state) => state.problems);

  let filtered = [...problems];

  // Apply filters
  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(p => p.title?.toLowerCase().includes(q) || p.topic?.toLowerCase().includes(q));
  }
  if (filters.difficulty) filtered = filtered.filter(p => p.difficulty === filters.difficulty);
  if (filters.topic) filtered = filtered.filter(p => p.topic === filters.topic);
  if (filters.platform) filtered = filtered.filter(p => p.platform === filters.platform);

  // Sort
  switch (filters.sortBy) {
    case 'oldest': filtered.sort((a, b) => new Date(a.$createdAt) - new Date(b.$createdAt)); break;
    case 'difficulty-asc': filtered.sort((a, b) => difficultyOrder(a.difficulty) - difficultyOrder(b.difficulty)); break;
    case 'difficulty-desc': filtered.sort((a, b) => difficultyOrder(b.difficulty) - difficultyOrder(a.difficulty)); break;
    case 'name-asc': filtered.sort((a, b) => (a.title || '').localeCompare(b.title || '')); break;
    case 'name-desc': filtered.sort((a, b) => (b.title || '').localeCompare(a.title || '')); break;
    default: filtered.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)); break;
  }

  if (filtered.length === 0) {
    return <EmptyState icon={<Code2 size={32} className="text-zinc-500" />} title="No problems found" description={problems.length > 0 ? 'Try adjusting your filters' : 'Start by adding your first problem'} actionLabel={problems.length === 0 ? '+ Add Problem' : undefined} onAction={onAdd} />;
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between px-1 mb-2">
        <span className="text-xs text-zinc-500">{filtered.length} problem{filtered.length !== 1 ? 's' : ''}</span>
      </div>
      {filtered.map(p => <ProblemCard key={p.$id} problem={p} onEdit={onEdit} />)}
    </div>
  );
};

export default ProblemList;
