/**
 * ResumesPage
 * 
 * Resume management with upload modal.
 */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResumes } from '../redux/slices/resumeSlice';
import AppLayout from '../components/layout/AppLayout';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Spinner from '../components/ui/Spinner';
import ResumeUpload from '../features/resumes/ResumeUpload';
import ResumeList from '../features/resumes/ResumeList';
import useAuth from '../hooks/useAuth';

const ResumesPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { status } = useSelector((state) => state.resumes);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) dispatch(fetchResumes(user.$id));
  }, [dispatch, user]);

  return (
    <AppLayout title="Resumes">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Resume Manager</h2>
            <p className="text-sm text-gray-400">Upload and manage resume versions</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            + Upload Resume
          </Button>
        </div>

        {status === 'loading' ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <ResumeList onAdd={() => setIsModalOpen(true)} />
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload Resume"
      >
        <ResumeUpload onClose={() => setIsModalOpen(false)} />
      </Modal>
    </AppLayout>
  );
};

export default ResumesPage;
