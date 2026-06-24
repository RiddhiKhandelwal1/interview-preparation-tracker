/**
 * InterviewCard Component
 * 
 * Displays a single interview entry with status badge and actions.
 */

import { useDispatch } from 'react-redux';
import { deleteInterview } from '../../redux/slices/interviewSlice';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { INTERVIEW_STATUSES } from '../../utils/constants';
import { formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

const statusVariantMap = {
  applied: 'info',
  oa: 'purple',
  interview: 'warning',
  rejected: 'danger',
  offer: 'success',
};

const InterviewCard = ({ interview, onEdit }) => {
  const dispatch = useDispatch();
  const statusInfo = INTERVIEW_STATUSES.find((s) => s.value === interview.status);

  const handleDelete = async () => {
    if (!window.confirm('Delete this interview entry?')) return;
    try {
      await dispatch(deleteInterview(interview.$id)).unwrap();
      toast.success('Interview deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <Card hover className="group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{statusInfo?.icon}</span>
            <h3 className="text-sm font-semibold text-gray-100">{interview.company}</h3>
          </div>
          {interview.role && (
            <p className="text-sm text-gray-400 mb-2">{interview.role}</p>
          )}
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant={statusVariantMap[interview.status] || 'default'}>
              {statusInfo?.label}
            </Badge>
            {interview.interviewDate && (
              <Badge variant="default">📅 {formatDate(interview.interviewDate)}</Badge>
            )}
          </div>
          {interview.notes && (
            <p className="text-xs text-gray-500 line-clamp-2">{interview.notes}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={() => onEdit(interview)}
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
    </Card>
  );
};

export default InterviewCard;
