import { useSelector } from 'react-redux';
import InterviewCard from './InterviewCard';
import EmptyState from '../../components/ui/EmptyState';
import { INTERVIEW_STATUSES } from '../../utils/constants';
import { Send, Monitor, Target, XCircle, Trophy, Briefcase } from 'lucide-react';

const iconMap = { Send, Monitor, Target, XCircle, Trophy };

const InterviewList = ({ onEdit, onAdd }) => {
  const { items: interviews } = useSelector((state) => state.interviews);

  if (interviews.length === 0) {
    return <EmptyState icon={<Briefcase size={32} className="text-zinc-500" />} title="No interviews yet" description="Start tracking your job applications" actionLabel="+ Add Interview" onAction={onAdd} />;
  }

  // Group by status for pipeline view
  const grouped = INTERVIEW_STATUSES.reduce((acc, s) => {
    acc[s.value] = interviews.filter(i => i.status === s.value);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {INTERVIEW_STATUSES.map(status => {
        const items = grouped[status.value];
        if (items.length === 0) return null;
        const StatusIcon = iconMap[status.iconName];
        return (
          <div key={status.value}>
            <div className="flex items-center gap-2 mb-3">
              {StatusIcon && <StatusIcon size={16} className="text-zinc-400" />}
              <h3 className="text-sm font-medium text-zinc-300">{status.label}</h3>
              <span className="text-xs text-zinc-600 bg-zinc-800 rounded-full px-2 py-0.5">{items.length}</span>
            </div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              {items.map(i => <InterviewCard key={i.$id} interview={i} onEdit={onEdit} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InterviewList;
