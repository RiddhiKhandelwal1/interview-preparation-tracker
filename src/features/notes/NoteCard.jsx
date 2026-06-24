import { useDispatch, useSelector } from 'react-redux';
import { deleteNote } from '../../redux/slices/noteSlice';
import Badge from '../../components/ui/Badge';
import { timeAgo, truncate } from '../../utils/helpers';
import { Pencil, Trash2, Link2 } from 'lucide-react';
import toast from 'react-hot-toast';

const NoteCard = ({ note, onEdit }) => {
  const dispatch = useDispatch();
  const { items: problems } = useSelector((state) => state.problems);
  const linked = note.problemId ? problems.find(p => p.$id === note.problemId) : null;

  const handleDelete = async () => {
    if (!window.confirm('Delete this note?')) return;
    try { await dispatch(deleteNote(note.$id)).unwrap(); toast.success('Deleted'); } catch { toast.error('Failed'); }
  };

  return (
    <div className="group rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-4 hover:border-zinc-700/80 hover:bg-zinc-900/60 transition-all duration-150">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-sm font-medium text-zinc-200 truncate">{note.title}</h3>
        <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button onClick={() => onEdit(note)} className="rounded-md p-1 text-zinc-500 hover:text-indigo-400 hover:bg-zinc-800 transition-colors cursor-pointer"><Pencil size={13} /></button>
          <button onClick={handleDelete} className="rounded-md p-1 text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-colors cursor-pointer"><Trash2 size={13} /></button>
        </div>
      </div>
      <p className="text-[13px] text-zinc-500 whitespace-pre-wrap mb-3 leading-relaxed">{truncate(note.content, 180)}</p>
      <div className="flex items-center gap-2 flex-wrap">
        {linked && <Badge variant="info"><Link2 size={10} className="mr-0.5" />{linked.title}</Badge>}
        <span className="text-[11px] text-zinc-600">{timeAgo(note.$updatedAt)}</span>
      </div>
    </div>
  );
};

export default NoteCard;
