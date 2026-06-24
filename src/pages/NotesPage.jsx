import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes } from '../redux/slices/noteSlice';
import { fetchProblems } from '../redux/slices/problemSlice';
import AppLayout from '../components/layout/AppLayout';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { Skeleton } from '../components/ui/Spinner';
import NoteForm from '../features/notes/NoteForm';
import NoteList from '../features/notes/NoteList';
import useAuth from '../hooks/useAuth';
import { Plus, StickyNote } from 'lucide-react';

const NotesPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { status } = useSelector((state) => state.notes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => { if (user) { dispatch(fetchNotes(user.$id)); dispatch(fetchProblems(user.$id)); } }, [dispatch, user]);

  const handleAdd = () => { setEditingNote(null); setIsModalOpen(true); };
  const handleEdit = (note) => { setEditingNote(note); setIsModalOpen(true); };
  const handleClose = () => { setIsModalOpen(false); setEditingNote(null); };

  return (
    <AppLayout title="Notes">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
              <StickyNote size={16} className="text-amber-400" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-zinc-100">Study Notes</h2>
              <p className="text-xs text-zinc-500">Your personal knowledge base</p>
            </div>
          </div>
          <Button onClick={handleAdd} size="sm"><Plus size={14} /> New Note</Button>
        </div>

        {status === 'loading' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-36 rounded-xl" />)}
          </div>
        ) : (
          <NoteList onEdit={handleEdit} onAdd={handleAdd} />
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleClose} title={editingNote ? 'Edit Note' : 'Create Note'}>
        <NoteForm key={editingNote?.$id || 'new'} note={editingNote} onClose={handleClose} />
      </Modal>
    </AppLayout>
  );
};

export default NotesPage;
