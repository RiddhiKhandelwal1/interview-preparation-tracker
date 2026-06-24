/**
 * ResumeUpload Component
 * 
 * File upload form with drag-and-drop area for PDF resumes.
 * Demonstrates file input handling with React Hook Form.
 */

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { uploadResume } from '../../redux/slices/resumeSlice';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const ResumeUpload = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { uploadStatus } = useSelector((state) => state.resumes);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: '',
    },
  });

  const onSubmit = async (data) => {
    const file = data.file[0]; // FileList from the input
    if (!file) {
      toast.error('Please select a file');
      return;
    }
    try {
      await dispatch(
        uploadResume({ userId: user.$id, file, description: data.description })
      ).unwrap();
      toast.success('Resume uploaded!');
      reset();
      onClose?.();
    } catch (err) {
      toast.error(err || 'Upload failed');
    }
  };

  const inputClasses =
    'w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* File Upload Area */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-300">Resume PDF *</label>
        <div className="rounded-xl border-2 border-dashed border-gray-700 bg-gray-950/50 p-8 text-center hover:border-indigo-500/50 transition-colors">
          <div className="text-3xl mb-2">📄</div>
          <p className="text-sm text-gray-400 mb-3">Drop your PDF here or click to browse</p>
          <input
            type="file"
            accept="application/pdf"
            {...register('file', { required: 'Please select a PDF file' })}
            className="w-full text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:cursor-pointer hover:file:bg-indigo-500"
          />
        </div>
        {errors.file && <p className="mt-1 text-xs text-rose-400">{errors.file.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-300">Version Description</label>
        <input
          {...register('description')}
          className={inputClasses}
          placeholder="e.g., Updated for SDE-2 roles, added new projects"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={uploadStatus === 'loading'} className="flex-1">
          Upload Resume
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

export default ResumeUpload;
