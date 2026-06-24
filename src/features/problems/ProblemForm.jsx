/**
 * ProblemForm Component
 * 
 * Form for adding/editing problems using React Hook Form.
 * Demonstrates:
 * - Conditional default values (add vs edit mode)
 * - Select dropdowns with register()
 * - Reset form on successful submit
 */

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    // Pre-fill form when editing an existing problem
    defaultValues: {
      title: problem?.title || '',
      difficulty: problem?.difficulty || 'easy',
      topic: problem?.topic || '',
      platform: problem?.platform || 'leetcode',
      url: problem?.url || '',
      notes: problem?.notes || '',
      solved: problem?.solved || false,
      dateSolved: problem?.dateSolved?.split('T')[0] || '',
    },
  });

  const onSubmit = async (data) => {
    try {
      // Add userId and format date
      const payload = {
        ...data,
        userId: user.$id,
        dateSolved: data.dateSolved ? new Date(data.dateSolved).toISOString() : '',
      };

      if (isEditing) {
        await dispatch(updateProblem({ problemId: problem.$id, data: payload })).unwrap();
        toast.success('Problem updated!');
      } else {
        await dispatch(addProblem(payload)).unwrap();
        toast.success('Problem added!');
        reset(); // Clear form after adding
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
      {/* Title */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-300">Problem Title *</label>
        <input
          {...register('title', { required: 'Title is required' })}
          className={inputClasses}
          placeholder="Two Sum"
        />
        {errors.title && <p className="mt-1 text-xs text-rose-400">{errors.title.message}</p>}
      </div>

      {/* Difficulty + Platform row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-300">Difficulty *</label>
          <select {...register('difficulty', { required: true })} className={inputClasses}>
            {DIFFICULTIES.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-300">Platform *</label>
          <select {...register('platform', { required: true })} className={inputClasses}>
            {PLATFORMS.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Topic */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-300">Topic *</label>
        <select {...register('topic', { required: 'Topic is required' })} className={inputClasses}>
          <option value="">Select a topic</option>
          {TOPICS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.topic && <p className="mt-1 text-xs text-rose-400">{errors.topic.message}</p>}
      </div>

      {/* URL */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-300">Problem URL</label>
        <input
          {...register('url', {
            pattern: {
              value: /^https?:\/\/.+/i,
              message: 'Please enter a valid URL',
            },
          })}
          className={inputClasses}
          placeholder="https://leetcode.com/problems/two-sum"
        />
        {errors.url && <p className="mt-1 text-xs text-rose-400">{errors.url.message}</p>}
      </div>

      {/* Solved + Date row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 pt-6">
          <input
            type="checkbox"
            id="solved-checkbox"
            {...register('solved')}
            className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="solved-checkbox" className="text-sm text-gray-300">Solved</label>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-300">Date Solved</label>
          <input type="date" {...register('dateSolved')} className={inputClasses} />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-300">Personal Notes</label>
        <textarea
          {...register('notes')}
          rows={3}
          className={`${inputClasses} resize-none`}
          placeholder="Key insights, approach used, time complexity..."
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={isSubmitting} className="flex-1">
          {isEditing ? 'Update Problem' : 'Add Problem'}
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

export default ProblemForm;
