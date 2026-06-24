import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProblems } from '../redux/slices/problemSlice';
import AppLayout from '../components/layout/AppLayout';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { Skeleton } from '../components/ui/Spinner';
import ProblemForm from '../features/problems/ProblemForm';
import ProblemList from '../features/problems/ProblemList';
import FilterBar from '../features/problems/FilterBar';
import useAuth from '../hooks/useAuth';
import { Plus, Code2 } from 'lucide-react';

const ProblemsPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { status } = useSelector((state) => state.problems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);

  useEffect(() => { if (user) dispatch(fetchProblems(user.$id)); }, [dispatch, user]);

  const handleAdd = () => { setEditingProblem(null); setIsModalOpen(true); };
  const handleEdit = (problem) => { setEditingProblem(problem); setIsModalOpen(true); };
  const handleClose = () => { setIsModalOpen(false); setEditingProblem(null); };

  return (
    <AppLayout title="Problems">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10">
              <Code2 size={16} className="text-indigo-400" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-zinc-100">Problem Tracker</h2>
              <p className="text-xs text-zinc-500">Track and organize your coding problems</p>
            </div>
          </div>
          <Button onClick={handleAdd} size="sm"><Plus size={14} /> Add Problem</Button>
        </div>

        <FilterBar />

        {status === 'loading' ? (
          <div className="space-y-2">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 rounded-lg" />)}</div>
        ) : (
          <ProblemList onEdit={handleEdit} onAdd={handleAdd} />
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleClose} title={editingProblem ? 'Edit Problem' : 'Add Problem'} size="lg">
        <ProblemForm key={editingProblem?.$id || 'new'} problem={editingProblem} onClose={handleClose} />
      </Modal>
    </AppLayout>
  );
};

export default ProblemsPage;
