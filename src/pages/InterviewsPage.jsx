import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInterviews } from '../redux/slices/interviewSlice';
import AppLayout from '../components/layout/AppLayout';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { Skeleton } from '../components/ui/Spinner';
import InterviewForm from '../features/interviews/InterviewForm';
import InterviewList from '../features/interviews/InterviewList';
import InterviewTimeline from '../features/interviews/InterviewTimeline';
import useAuth from '../hooks/useAuth';
import { Plus, Briefcase, List, GitBranch } from 'lucide-react';

const InterviewsPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { status, items: interviews } = useSelector((state) => state.interviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInterview, setEditingInterview] = useState(null);
  const [viewMode, setViewMode] = useState('cards');

  useEffect(() => { if (user) dispatch(fetchInterviews(user.$id)); }, [dispatch, user]);

  const handleAdd = () => { setEditingInterview(null); setIsModalOpen(true); };
  const handleEdit = (interview) => { setEditingInterview(interview); setIsModalOpen(true); };
  const handleClose = () => { setIsModalOpen(false); setEditingInterview(null); };

  return (
    <AppLayout title="Interviews">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
              <Briefcase size={16} className="text-violet-400" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-zinc-100">Interview Tracker</h2>
              <p className="text-xs text-zinc-500">Track your job applications pipeline</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-zinc-800 bg-zinc-900/60 p-0.5">
              <button onClick={() => setViewMode('cards')} className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${viewMode === 'cards' ? 'bg-zinc-700 text-zinc-200' : 'text-zinc-500 hover:text-zinc-300'}`}>
                <List size={13} />
              </button>
              <button onClick={() => setViewMode('timeline')} className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${viewMode === 'timeline' ? 'bg-zinc-700 text-zinc-200' : 'text-zinc-500 hover:text-zinc-300'}`}>
                <GitBranch size={13} />
              </button>
            </div>
            <Button onClick={handleAdd} size="sm"><Plus size={14} /> Add Interview</Button>
          </div>
        </div>

        {status === 'loading' ? (
          <div className="space-y-3">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}</div>
        ) : viewMode === 'timeline' ? (
          <InterviewTimeline interviews={interviews} onEdit={handleEdit} />
        ) : (
          <InterviewList onEdit={handleEdit} onAdd={handleAdd} />
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleClose} title={editingInterview ? 'Edit Interview' : 'Add Interview'}>
        <InterviewForm key={editingInterview?.$id || 'new'} interview={editingInterview} onClose={handleClose} />
      </Modal>
    </AppLayout>
  );
};

export default InterviewsPage;
