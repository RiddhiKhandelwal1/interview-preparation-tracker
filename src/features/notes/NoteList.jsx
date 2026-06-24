/**
 * NoteList Component
 * 
 * Grid layout of note cards with empty state.
 */

import { useSelector } from 'react-redux';
import NoteCard from './NoteCard';
import EmptyState from '../../components/ui/EmptyState';

const NoteList = ({ onEdit, onAdd }) => {
  const { items: notes } = useSelector((state) => state.notes);

  if (notes.length === 0) {
    return (
      <EmptyState
        icon="📝"
        title="No notes yet"
        description="Create notes to capture key insights and study materials."
        actionLabel="Create First Note"
        onAction={onAdd}
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note.$id} note={note} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default NoteList;
