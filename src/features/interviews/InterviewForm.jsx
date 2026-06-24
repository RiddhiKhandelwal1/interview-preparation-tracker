import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addInterview, updateInterview } from '../../redux/slices/interviewSlice';
import Button from '../../components/ui/Button';
import { INTERVIEW_STATUSES } from '../../utils/constants';
import toast from 'react-hot-toast';

const InterviewForm = ({ interview, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isEditing = !!interview;
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      company: interview?.company || '', role: interview?.role || '', status: interview?.status || 'applied',
      interviewDate: interview?.interviewDate?.split('T')[0] || '', notes: interview?.notes || '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, userId: user.$id, interviewDate: data.interviewDate ? new Date(data.interviewDate).toISOString() : '' };
      if (isEditing) { await dispatch(updateInterview({ interviewId: interview.$id, data: payload })).unwrap(); toast.success('Updated!'); }
      else { await dispatch(addInterview(payload)).unwrap(); toast.success('Added!'); reset(); }
      onClose?.();
    } catch (err) { toast.error(err || 'Something went wrong'); }
  };

  const inputCls = 'w-full h-9 rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 text-sm text-zinc-200 placeholder-zinc-600 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all';
  const labelCls = 'mb-1.5 block text-xs font-medium text-zinc-400 uppercase tracking-wider';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className={labelCls}>Company *</label>
        <input {...register('company', { required: 'Required' })} className={inputCls} placeholder="Google" />
        {errors.company && <p className="mt-1 text-xs text-red-400">{errors.company.message}</p>}
      </div>
      <div>
        <label className={labelCls}>Role</label>
        <input {...register('role')} className={inputCls} placeholder="Software Engineer" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Status *</label>
          <select {...register('status', { required: true })} className={inputCls}>
            {INTERVIEW_STATUSES.map(s => <option key={s.value} value={s.value}>{s.icon} {s.label}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Interview Date</label>
          <input type="date" {...register('interviewDate')} className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Notes</label>
        <textarea {...register('notes')} rows={3} className={`${inputCls} h-auto py-2 resize-none`} placeholder="Key details..." />
      </div>
      <div className="flex gap-2 pt-2">
        <Button type="submit" loading={isSubmitting} className="flex-1">{isEditing ? 'Update' : 'Add Interview'}</Button>
        {onClose && <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>}
      </div>
    </form>
  );
};

export default InterviewForm;
