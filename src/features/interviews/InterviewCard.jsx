import { useDispatch } from 'react-redux';
import { deleteInterview } from '../../redux/slices/interviewSlice';
import Badge from '../../components/ui/Badge';
import { INTERVIEW_STATUSES } from '../../utils/constants';
import { formatDate } from '../../utils/helpers';
import { Pencil, Trash2, Send, Monitor, Target, XCircle, Trophy, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const statusVariant = { applied: 'info', oa: 'purple', interview: 'warning', rejected: 'danger', offer: 'success' };
const iconMap = { Send, Monitor, Target, XCircle, Trophy };

const InterviewCard = ({ interview, onEdit }) => {
  const dispatch = useDispatch();
  const si = INTERVIEW_STATUSES.find(s => s.value === interview.status);
  const StatusIcon = si ? iconMap[si.iconName] : null;

  const handleDelete = async () => {
    if (!window.confirm('Delete?')) return;
    try { await dispatch(deleteInterview(interview.$id)).unwrap(); toast.success('Deleted'); } catch { toast.error('Failed'); }
  };

  return (
    <div className="group rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-4 hover:border-zinc-700/80 hover:bg-zinc-900/60 transition-all duration-150">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            {StatusIcon && <StatusIcon size={16} className="text-zinc-400 flex-shrink-0" />}
            <h3 className="text-sm font-medium text-zinc-200">{interview.company}</h3>
          </div>
          {interview.role && <p className="text-[13px] text-zinc-500 mb-2">{interview.role}</p>}
          <div className="flex flex-wrap gap-1.5">
            <Badge variant={statusVariant[interview.status]} dot>{si?.label}</Badge>
            {interview.interviewDate && <Badge variant="default"><Calendar size={10} className="mr-0.5" />{formatDate(interview.interviewDate)}</Badge>}
          </div>
          {interview.notes && <p className="text-xs text-zinc-600 mt-2 line-clamp-2">{interview.notes}</p>}
        </div>
        <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button onClick={() => onEdit(interview)} className="rounded-md p-1 text-zinc-500 hover:text-indigo-400 hover:bg-zinc-800 transition-colors cursor-pointer"><Pencil size={13} /></button>
          <button onClick={handleDelete} className="rounded-md p-1 text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-colors cursor-pointer"><Trash2 size={13} /></button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
