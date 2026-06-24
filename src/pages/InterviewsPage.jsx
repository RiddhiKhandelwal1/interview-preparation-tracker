/**
 * InterviewsPage
 * 
 * Interview tracking with list/timeline views.
 */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInterviews } from '../redux/slices/interviewSlice';
import AppLayout from '../components/layout/AppLayout';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Spinner from '../components/ui/Spinner';
import InterviewForm from '../features/interviews/InterviewForm';
import InterviewList from '../features/interviews/InterviewList';
import useAuth from '../hooks/useAuth';

const InterviewsPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { status } = useSelector((state) => state.interviews);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInterview, setEditingInterview] = useState(null);

  useEffect(() => {
    if (user) dispatch(fetchInterviews(user.$id));
  }, [dispatch, user]);

  const handleAdd = () => {
    setEditingInterview(null);
    setIsModalOpen(true);
  };

  const handleEdit = (interview) => {
    setEditingInterview(interview);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingInterview(null);
  };

  return (
    <AppLayout title="Interviews">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Interview Tracker</h2>
            <p className="text-sm text-gray-400">Track your application pipeline</p>
          </div>
          <Button onClick={handleAdd}>
            + Add Interview
          </Button>
        </div>

        {status === 'loading' ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <InterviewList onEdit={handleEdit} onAdd={handleAdd} />
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingInterview ? 'Edit Interview' : 'Add Interview'}
      >
        <InterviewForm
          key={editingInterview?.$id || 'new'}
          interview={editingInterview}
          onClose={handleCloseModal}
        />
      </Modal>
    </AppLayout>
  );
};

export default InterviewsPage;
