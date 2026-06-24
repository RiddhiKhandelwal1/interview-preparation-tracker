/**
 * ProblemCard Component
 * 
 * Displays a single problem with status, metadata, and action buttons.
 */

import { useDispatch } from 'react-redux';
import { deleteProblem, updateProblem } from '../../redux/slices/problemSlice';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { formatDate } from '../../utils/helpers';
import { PLATFORMS } from '../../utils/constants';
import toast from 'react-hot-toast';

const ProblemCard = ({ problem, onEdit }) => {
  const dispatch = useDispatch();

  const platform = PLATFORMS.find((p) => p.value === problem.platform);

  const handleToggleSolved = async () => {
    try {
      await dispatch(
        updateProblem({
          problemId: problem.$id,
          data: {
            solved: !problem.solved,
            dateSolved: !problem.solved ? new Date().toISOString() : '',
          },
        })
      ).unwrap();
      toast.success(problem.solved ? 'Marked as unsolved' : 'Marked as solved!');
    } catch {
      toast.error('Failed to update');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this problem?')) return;
    try {
      await dispatch(deleteProblem(problem.$id)).unwrap();
      toast.success('Problem deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <Card hover className="relative group">
      {/* Solved indicator */}
      <div className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl ${problem.solved ? 'bg-emerald-500' : 'bg-gray-700'}`} />

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Title + Platform */}
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-sm font-semibold text-gray-100 truncate">{problem.title}</h3>
            {problem.url && (
              <a
                href={problem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-indigo-400 transition-colors flex-shrink-0"
                aria-label="Open problem link"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            )}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant={problem.difficulty}>{problem.difficulty}</Badge>
            <Badge variant="info">{problem.topic}</Badge>
            <Badge variant="purple">
              {platform?.icon} {platform?.label}
            </Badge>
          </div>

          {/* Notes preview */}
          {problem.notes && (
            <p className="text-xs text-gray-500 line-clamp-2 mb-2">{problem.notes}</p>
          )}

          {/* Date */}
          <p className="text-xs text-gray-600">
            {problem.solved ? `Solved ${formatDate(problem.dateSolved)}` : 'Not solved yet'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleToggleSolved}
            className={`rounded-lg p-1.5 transition-colors cursor-pointer ${
              problem.solved
                ? 'text-emerald-400 hover:bg-emerald-500/10'
                : 'text-gray-500 hover:bg-gray-800'
            }`}
            title={problem.solved ? 'Mark unsolved' : 'Mark solved'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => onEdit(problem)}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-800 hover:text-indigo-400 transition-colors cursor-pointer"
            title="Edit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-rose-500/10 hover:text-rose-400 transition-colors cursor-pointer"
            title="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ProblemCard;
