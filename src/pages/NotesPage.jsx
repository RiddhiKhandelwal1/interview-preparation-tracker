/**
 * NotesPage
 * 
 * Notes management with create/edit modal.
 */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes } from '../redux/slices/noteSlice';
import { fetchProblems } from '../redux/slices/problemSlice';
import AppLayout from '../components/layout/AppLayout';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Spinner from '../components/ui/Spinner';
import NoteForm from '../features/notes/NoteForm';
import NoteList from '../features/notes/NoteList';
import useAuth from '../hooks/useAuth';

const NotesPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { status } = useSelector((state) => state.notes);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchNotes(user.$id));
      dispatch(fetchProblems(user.$id)); // For linking notes to problems
    }
  }, [dispatch, user]);

  const handleAdd = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
  };

  return (
    <AppLayout title="Notes">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Study Notes</h2>
            <p className="text-sm text-gray-400">Capture insights and link them to problems</p>
          </div>
          <Button onClick={handleAdd}>
            + Create Note
          </Button>
        </div>

        {status === 'loading' ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <NoteList onEdit={handleEdit} onAdd={handleAdd} />
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingNote ? 'Edit Note' : 'Create Note'}
        size="lg"
      >
        <NoteForm
          key={editingNote?.$id || 'new'}
          note={editingNote}
          onClose={handleCloseModal}
        />
      </Modal>
    </AppLayout>
  );
};

export default NotesPage;
