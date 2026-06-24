/**
 * InterviewForm Component
 * 
 * Form for adding/editing interview tracking entries.
 */

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      company: interview?.company || '',
      role: interview?.role || '',
      status: interview?.status || 'applied',
      interviewDate: interview?.interviewDate?.split('T')[0] || '',
      notes: interview?.notes || '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        userId: user.$id,
        interviewDate: data.interviewDate ? new Date(data.interviewDate).toISOString() : '',
      };

      if (isEditing) {
        await dispatch(updateInterview({ interviewId: interview.$id, data: payload })).unwrap();
        toast.success('Interview updated!');
      } else {
        await dispatch(addInterview(payload)).unwrap();
        toast.success('Interview added!');
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-300">Company *</label>
          <input
            {...register('company', { required: 'Company is required' })}
            className={inputClasses}
            placeholder="Google"
          />
          {errors.company && <p className="mt-1 text-xs text-rose-400">{errors.company.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-300">Role</label>
          <input
            {...register('role')}
            className={inputClasses}
            placeholder="Software Engineer"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-300">Status *</label>
          <select {...register('status', { required: true })} className={inputClasses}>
            {INTERVIEW_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.icon} {s.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-300">Interview Date</label>
          <input type="date" {...register('interviewDate')} className={inputClasses} />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-300">Notes</label>
        <textarea
          {...register('notes')}
          rows={3}
          className={`${inputClasses} resize-none`}
          placeholder="Interviewer, topics discussed, feedback..."
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={isSubmitting} className="flex-1">
          {isEditing ? 'Update' : 'Add Interview'}
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

export default InterviewForm;
