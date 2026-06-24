import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addProblem, updateProblem } from '../../redux/slices/problemSlice';
import Button from '../../components/ui/Button';
import { DIFFICULTIES, PLATFORMS, TOPICS } from '../../utils/constants';
import toast from 'react-hot-toast';

const ProblemForm = ({ problem, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isEditing = !!problem;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      title: problem?.title || '', difficulty: problem?.difficulty || 'easy', topic: problem?.topic || '',
      platform: problem?.platform || 'leetcode', url: problem?.url || '', notes: problem?.notes || '',
      solved: problem?.solved || false, dateSolved: problem?.dateSolved?.split('T')[0] || '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, userId: user.$id, dateSolved: data.dateSolved ? new Date(data.dateSolved).toISOString() : '' };
      if (isEditing) { await dispatch(updateProblem({ problemId: problem.$id, data: payload })).unwrap(); toast.success('Updated!'); }
      else { await dispatch(addProblem(payload)).unwrap(); toast.success('Added!'); reset(); }
      onClose?.();
    } catch (err) { toast.error(err || 'Something went wrong'); }
  };

  const inputCls = 'w-full h-9 rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 text-sm text-zinc-200 placeholder-zinc-600 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all';
  const labelCls = 'mb-1.5 block text-xs font-medium text-zinc-400 uppercase tracking-wider';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className={labelCls}>Problem Title *</label>
        <input {...register('title', { required: 'Required' })} className={inputCls} placeholder="Two Sum" />
        {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Difficulty *</label>
          <select {...register('difficulty', { required: true })} className={inputCls}>
            {DIFFICULTIES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Platform *</label>
          <select {...register('platform', { required: true })} className={inputCls}>
            {PLATFORMS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Topic *</label>
        <select {...register('topic', { required: 'Required' })} className={inputCls}>
          <option value="">Select topic</option>
          {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        {errors.topic && <p className="mt-1 text-xs text-red-400">{errors.topic.message}</p>}
      </div>

      <div>
        <label className={labelCls}>URL</label>
        <input {...register('url', { pattern: { value: /^https?:\/\/.+/i, message: 'Invalid URL' } })} className={inputCls} placeholder="https://leetcode.com/problems/two-sum" />
        {errors.url && <p className="mt-1 text-xs text-red-400">{errors.url.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2.5 pt-5">
          <input type="checkbox" id="solved-cb" {...register('solved')} className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 cursor-pointer" />
          <label htmlFor="solved-cb" className="text-sm text-zinc-400 cursor-pointer">Solved</label>
        </div>
        <div>
          <label className={labelCls}>Date Solved</label>
          <input type="date" {...register('dateSolved')} className={inputCls} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Notes</label>
        <textarea {...register('notes')} rows={3} className={`${inputCls} h-auto py-2 resize-none`} placeholder="Approach, complexity..." />
      </div>

      <div className="flex gap-2 pt-2">
        <Button type="submit" loading={isSubmitting} className="flex-1">{isEditing ? 'Update' : 'Add Problem'}</Button>
        {onClose && <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>}
      </div>
    </form>
  );
};

export default ProblemForm;
