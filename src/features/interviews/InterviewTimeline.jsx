import Badge from '../../components/ui/Badge';
import { INTERVIEW_STATUSES } from '../../utils/constants';
import { formatDate } from '../../utils/helpers';
import { Send, Monitor, Target, XCircle, Trophy } from 'lucide-react';

const statusColors = { applied: 'bg-blue-500', oa: 'bg-violet-500', interview: 'bg-amber-500', rejected: 'bg-red-500', offer: 'bg-emerald-500' };
const statusVariant = { applied: 'info', oa: 'purple', interview: 'warning', rejected: 'danger', offer: 'success' };
const iconMap = { Send, Monitor, Target, XCircle, Trophy };

const InterviewTimeline = ({ interviews, onEdit }) => {
  const sorted = [...interviews].sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));

  return (
    <div className="relative">
      <div className="absolute left-[11px] top-0 bottom-0 w-px bg-zinc-800" />
      <div className="space-y-4">
        {sorted.map(interview => {
          const si = INTERVIEW_STATUSES.find(s => s.value === interview.status);
          const StatusIcon = si ? iconMap[si.iconName] : null;
          return (
            <div key={interview.$id} className="relative flex gap-4 pl-8">
              <div className={`absolute left-1.5 top-2 h-2.5 w-2.5 rounded-full ${statusColors[interview.status] || 'bg-zinc-600'} ring-4 ring-zinc-950`} />
              <div className="flex-1 rounded-lg border border-zinc-800/60 bg-zinc-900/30 p-3.5 hover:border-zinc-700 transition-colors cursor-pointer" onClick={() => onEdit(interview)}>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    {StatusIcon && <StatusIcon size={14} className="text-zinc-400" />}
                    <h4 className="text-sm font-medium text-zinc-200">{interview.company}</h4>
                  </div>
                  <Badge variant={statusVariant[interview.status]} dot>{si?.label}</Badge>
                </div>
                {interview.role && <p className="text-[13px] text-zinc-500">{interview.role}</p>}
                <p className="text-[11px] text-zinc-600 mt-1">{interview.interviewDate ? formatDate(interview.interviewDate) : formatDate(interview.$createdAt)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InterviewTimeline;
