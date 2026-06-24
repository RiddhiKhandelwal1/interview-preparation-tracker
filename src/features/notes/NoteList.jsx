import { useState } from 'react';
import { useSelector } from 'react-redux';
import NoteCard from './NoteCard';
import EmptyState from '../../components/ui/EmptyState';
import SearchInput from '../../components/ui/SearchInput';
import { StickyNote } from 'lucide-react';

const NoteList = ({ onEdit, onAdd }) => {
  const { items: notes } = useSelector((state) => state.notes);
  const [search, setSearch] = useState('');

  let filtered = notes;
  if (search) {
    const q = search.toLowerCase();
    filtered = notes.filter(n => n.title?.toLowerCase().includes(q) || n.content?.toLowerCase().includes(q));
  }

  if (filtered.length === 0 && notes.length === 0) {
    return <EmptyState icon={<StickyNote size={32} className="text-zinc-500" />} title="No notes yet" description="Create your first study note" actionLabel="+ New Note" onAction={onAdd} />;
  }

  return (
    <div>
      <SearchInput value={search} onChange={setSearch} placeholder="Search notes..." className="mb-4 max-w-xs" />
      {filtered.length === 0 ? (
        <p className="text-sm text-zinc-500 text-center py-8">No notes match your search</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(n => <NoteCard key={n.$id} note={n} onEdit={onEdit} />)}
        </div>
      )}
    </div>
  );
};

export default NoteList;
