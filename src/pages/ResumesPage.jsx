import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResumes } from '../redux/slices/resumeSlice';
import AppLayout from '../components/layout/AppLayout';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { Skeleton } from '../components/ui/Spinner';
import ResumeUpload from '../features/resumes/ResumeUpload';
import ResumeList from '../features/resumes/ResumeList';
import useAuth from '../hooks/useAuth';
import { Upload, FileText } from 'lucide-react';

const ResumesPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { status } = useSelector((state) => state.resumes);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => { if (user) dispatch(fetchResumes(user.$id)); }, [dispatch, user]);

  return (
    <AppLayout title="Resumes">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
              <FileText size={16} className="text-red-400" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-zinc-100">Resume Manager</h2>
              <p className="text-xs text-zinc-500">Upload and manage your resumes</p>
            </div>
          </div>
          <Button onClick={() => setIsModalOpen(true)} size="sm"><Upload size={14} /> Upload</Button>
        </div>

        {status === 'loading' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-36 rounded-xl" />)}
          </div>
        ) : (
          <ResumeList onAdd={() => setIsModalOpen(true)} />
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Upload Resume">
        <ResumeUpload onClose={() => setIsModalOpen(false)} />
      </Modal>
    </AppLayout>
  );
};

export default ResumesPage;
