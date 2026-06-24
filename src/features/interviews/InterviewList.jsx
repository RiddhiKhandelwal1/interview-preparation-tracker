/**
 * InterviewList Component
 * 
 * Displays interviews in both list and timeline views.
 */

import { useSelector } from 'react-redux';
import InterviewCard from './InterviewCard';
import InterviewTimeline from './InterviewTimeline';
import EmptyState from '../../components/ui/EmptyState';
import { useState } from 'react';

const InterviewList = ({ onEdit, onAdd }) => {
  const { items: interviews } = useSelector((state) => state.interviews);
  const [view, setView] = useState('list'); // 'list' | 'timeline'

  if (interviews.length === 0) {
    return (
      <EmptyState
        icon="💼"
        title="No interviews tracked"
        description="Start tracking your interview applications and progress."
        actionLabel="Add First Interview"
        onAction={onAdd}
      />
    );
  }

  return (
    <div>
      {/* View Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setView('list')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
            view === 'list'
              ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
              : 'text-gray-400 hover:bg-gray-800'
          }`}
        >
          List View
        </button>
        <button
          onClick={() => setView('timeline')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
            view === 'timeline'
              ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
              : 'text-gray-400 hover:bg-gray-800'
          }`}
        >
          Timeline View
        </button>
      </div>

      {view === 'list' ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {interviews.map((interview) => (
            <InterviewCard key={interview.$id} interview={interview} onEdit={onEdit} />
          ))}
        </div>
      ) : (
        <InterviewTimeline interviews={interviews} onEdit={onEdit} />
      )}
    </div>
  );
};

export default InterviewList;
