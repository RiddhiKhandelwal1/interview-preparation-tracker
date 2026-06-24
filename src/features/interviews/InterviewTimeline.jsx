/**
 * InterviewTimeline Component
 * 
 * Visual timeline view of interview applications,
 * sorted by date with status-colored nodes.
 */

import Badge from '../../components/ui/Badge';
import { INTERVIEW_STATUSES } from '../../utils/constants';
import { formatDate } from '../../utils/helpers';

const statusColors = {
  applied: 'bg-blue-500',
  oa: 'bg-purple-500',
  interview: 'bg-amber-500',
  rejected: 'bg-rose-500',
  offer: 'bg-emerald-500',
};

const statusVariantMap = {
  applied: 'info',
  oa: 'purple',
  interview: 'warning',
  rejected: 'danger',
  offer: 'success',
};

const InterviewTimeline = ({ interviews, onEdit }) => {
  const sorted = [...interviews].sort(
    (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
  );

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-800" />

      <div className="space-y-6">
        {sorted.map((interview) => {
          const statusInfo = INTERVIEW_STATUSES.find((s) => s.value === interview.status);
          return (
            <div key={interview.$id} className="relative flex gap-4 pl-10">
              {/* Timeline node */}
              <div
                className={`absolute left-2.5 top-1.5 h-3 w-3 rounded-full ${
                  statusColors[interview.status] || 'bg-gray-600'
                } ring-4 ring-gray-950`}
              />

              {/* Content */}
              <div
                className="flex-1 rounded-xl border border-gray-800 bg-gray-900/50 p-4 hover:border-gray-700 transition-colors cursor-pointer"
                onClick={() => onEdit(interview)}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span>{statusInfo?.icon}</span>
                    <h4 className="text-sm font-semibold text-gray-100">{interview.company}</h4>
                  </div>
                  <Badge variant={statusVariantMap[interview.status] || 'default'}>
                    {statusInfo?.label}
                  </Badge>
                </div>
                {interview.role && (
                  <p className="text-sm text-gray-400 mb-1">{interview.role}</p>
                )}
                <p className="text-xs text-gray-500">
                  {interview.interviewDate
                    ? formatDate(interview.interviewDate)
                    : formatDate(interview.$createdAt)}
                </p>
                {interview.notes && (
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">{interview.notes}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InterviewTimeline;
