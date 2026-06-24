/**
 * NoteForm Component
 * 
 * Form for creating/editing notes with optional problem linking.
 */

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, updateNote } from '../../redux/slices/noteSlice';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const NoteForm = ({ note, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: problems } = useSelector((state) => state.problems);
  const isEditing = !!note;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: note?.title || '',
      content: note?.content || '',
      problemId: note?.problemId || '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, userId: user.$id };

      if (isEditing) {
        await dispatch(updateNote({ noteId: note.$id, data: payload })).unwrap();
        toast.success('Note updated!');
      } else {
        await dispatch(addNote(payload)).unwrap();
        toast.success('Note created!');
        reset();
      }
      onClose?.();
    } catch (err) {
      toast.error(err || 'Something went wrong');
    }
  };

  const inputClasses =
    'w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-300">Title *</label>
        <input
          {...register('title', { required: 'Title is required' })}
          className={inputClasses}
          placeholder="Note title"
        />
        {errors.title && <p className="mt-1 text-xs text-rose-400">{errors.title.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-300">Content *</label>
        <textarea
          {...register('content', { required: 'Content is required' })}
          rows={6}
          className={`${inputClasses} resize-none`}
          placeholder="Write your notes here..."
        />
        {errors.content && <p className="mt-1 text-xs text-rose-400">{errors.content.message}</p>}
      </div>

      {/* Link to Problem (optional) */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-300">Link to Problem</label>
        <select {...register('problemId')} className={inputClasses}>
          <option value="">None</option>
          {problems.map((p) => (
            <option key={p.$id} value={p.$id}>{p.title}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={isSubmitting} className="flex-1">
          {isEditing ? 'Update Note' : 'Create Note'}
        </Button>
        {onClose && (
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;
