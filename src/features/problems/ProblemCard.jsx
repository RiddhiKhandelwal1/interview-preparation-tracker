import { useDispatch } from 'react-redux';
import { deleteProblem, updateProblem } from '../../redux/slices/problemSlice';
import Badge from '../../components/ui/Badge';
import { formatDate } from '../../utils/helpers';
import { PLATFORMS } from '../../utils/constants';
import { Check, Pencil, Trash2, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

const ProblemCard = ({ problem, onEdit }) => {
  const dispatch = useDispatch();
  const platform = PLATFORMS.find(p => p.value === problem.platform);

  const handleToggle = async () => {
    try {
      await dispatch(updateProblem({ problemId: problem.$id, data: { solved: !problem.solved, dateSolved: !problem.solved ? new Date().toISOString() : '' } })).unwrap();
      toast.success(problem.solved ? 'Marked unsolved' : 'Marked solved!');
    } catch { toast.error('Failed'); }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this problem?')) return;
    try { await dispatch(deleteProblem(problem.$id)).unwrap(); toast.success('Deleted'); } catch { toast.error('Failed'); }
  };

  return (
    <div className="group flex items-center gap-4 rounded-lg border border-zinc-800/60 bg-zinc-900/30 px-4 py-3 hover:border-zinc-700/80 hover:bg-zinc-900/60 transition-all duration-150">
      {/* Solved toggle */}
      <button onClick={handleToggle} className={`flex h-5 w-5 items-center justify-center rounded-[5px] border transition-all cursor-pointer flex-shrink-0 ${
        problem.solved ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-zinc-700 hover:border-zinc-500'
      }`}>
        {problem.solved && <Check size={12} strokeWidth={3} />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium truncate ${problem.solved ? 'text-zinc-400 line-through' : 'text-zinc-200'}`}>{problem.title}</span>
          {problem.url && (
            <a href={problem.url} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-indigo-400 transition-colors flex-shrink-0">
              <ExternalLink size={12} />
            </a>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <Badge variant={problem.difficulty}>{problem.difficulty}</Badge>
          <Badge variant="default">{problem.topic}</Badge>
          {platform && <Badge variant="purple"><span className="inline-block h-2 w-2 rounded-full mr-1" style={{ background: platform.color }} />{platform.label}</Badge>}
        </div>
      </div>

      {/* Date */}
      <span className="text-[11px] text-zinc-600 hidden sm:block flex-shrink-0">
        {problem.solved ? formatDate(problem.dateSolved) : '—'}
      </span>

      {/* Actions */}
      <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button onClick={() => onEdit(problem)} className="rounded-md p-1.5 text-zinc-500 hover:text-indigo-400 hover:bg-zinc-800 transition-colors cursor-pointer"><Pencil size={13} /></button>
        <button onClick={handleDelete} className="rounded-md p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-colors cursor-pointer"><Trash2 size={13} /></button>
      </div>
    </div>
  );
};

export default ProblemCard;
