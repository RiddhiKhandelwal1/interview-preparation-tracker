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
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { title: note?.title || '', content: note?.content || '', problemId: note?.problemId || '' },
  });

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, userId: user.$id };
      if (isEditing) { await dispatch(updateNote({ noteId: note.$id, data: payload })).unwrap(); toast.success('Updated!'); }
      else { await dispatch(addNote(payload)).unwrap(); toast.success('Created!'); reset(); }
      onClose?.();
    } catch (err) { toast.error(err || 'Something went wrong'); }
  };

  const inputCls = 'w-full h-9 rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 text-sm text-zinc-200 placeholder-zinc-600 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all';
  const labelCls = 'mb-1.5 block text-xs font-medium text-zinc-400 uppercase tracking-wider';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className={labelCls}>Title *</label>
        <input {...register('title', { required: 'Required' })} className={inputCls} placeholder="Note title" />
        {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>}
      </div>
      <div>
        <label className={labelCls}>Content *</label>
        <textarea {...register('content', { required: 'Required' })} rows={6} className={`${inputCls} h-auto py-2 resize-none`} placeholder="Write your notes..." />
        {errors.content && <p className="mt-1 text-xs text-red-400">{errors.content.message}</p>}
      </div>
      <div>
        <label className={labelCls}>Link to Problem</label>
        <select {...register('problemId')} className={inputCls}>
          <option value="">None</option>
          {problems.map(p => <option key={p.$id} value={p.$id}>{p.title}</option>)}
        </select>
      </div>
      <div className="flex gap-2 pt-2">
        <Button type="submit" loading={isSubmitting} className="flex-1">{isEditing ? 'Update' : 'Create Note'}</Button>
        {onClose && <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>}
      </div>
    </form>
  );
};

export default NoteForm;
