/**
 * ProblemsPage
 * 
 * Full problem tracker with add/edit modal, filter bar, and problem list.
 * 
 * React Hooks Concept:
 * - useState: Manages local UI state (modal open, selected problem)
 * - These are not global state — they're transient UI concerns
 */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProblems } from '../redux/slices/problemSlice';
import AppLayout from '../components/layout/AppLayout';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Spinner from '../components/ui/Spinner';
import ProblemForm from '../features/problems/ProblemForm';
import ProblemList from '../features/problems/ProblemList';
import FilterBar from '../features/problems/FilterBar';
import useAuth from '../hooks/useAuth';

const ProblemsPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { status } = useSelector((state) => state.problems);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);

  useEffect(() => {
    if (user) dispatch(fetchProblems(user.$id));
  }, [dispatch, user]);

  const handleAdd = () => {
    setEditingProblem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (problem) => {
    setEditingProblem(problem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProblem(null);
  };

  return (
    <AppLayout title="Problems">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Problem Tracker</h2>
            <p className="text-sm text-gray-400">Track your coding problems and progress</p>
          </div>
          <Button onClick={handleAdd}>
            + Add Problem
          </Button>
        </div>

        {/* Filters */}
        <FilterBar />

        {/* Problem List */}
        {status === 'loading' ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <ProblemList onEdit={handleEdit} onAdd={handleAdd} />
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProblem ? 'Edit Problem' : 'Add Problem'}
        size="lg"
      >
        <ProblemForm
          key={editingProblem?.$id || 'new'}
          problem={editingProblem}
          onClose={handleCloseModal}
        />
      </Modal>
    </AppLayout>
  );
};

export default ProblemsPage;
