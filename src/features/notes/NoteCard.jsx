/**
 * NoteCard Component
 * 
 * Displays a single note with linked problem reference.
 */

import { useDispatch, useSelector } from 'react-redux';
import { deleteNote } from '../../redux/slices/noteSlice';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { timeAgo, truncate } from '../../utils/helpers';
import toast from 'react-hot-toast';

const NoteCard = ({ note, onEdit }) => {
  const dispatch = useDispatch();
  const { items: problems } = useSelector((state) => state.problems);

  const linkedProblem = note.problemId
    ? problems.find((p) => p.$id === note.problemId)
    : null;

  const handleDelete = async () => {
    if (!window.confirm('Delete this note?')) return;
    try {
      await dispatch(deleteNote(note.$id)).unwrap();
      toast.success('Note deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <Card hover className="group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-sm font-semibold text-gray-100">{note.title}</h3>
        {/* Actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={() => onEdit(note)}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-800 hover:text-indigo-400 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-rose-500/10 hover:text-rose-400 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-400 whitespace-pre-wrap mb-3">{truncate(note.content, 200)}</p>

      <div className="flex items-center gap-2 flex-wrap">
        {linkedProblem && (
          <Badge variant="info">🔗 {linkedProblem.title}</Badge>
        )}
        <span className="text-xs text-gray-600">{timeAgo(note.$updatedAt)}</span>
      </div>
    </Card>
  );
};

export default NoteCard;
