import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { uploadResume } from '../../redux/slices/resumeSlice';
import Button from '../../components/ui/Button';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';

const ResumeUpload = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { uploadStatus } = useSelector((state) => state.resumes);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: { description: '' } });

  const onSubmit = async (data) => {
    const file = data.file[0];
    if (!file) { toast.error('Select a file'); return; }
    try {
      await dispatch(uploadResume({ userId: user.$id, file, description: data.description })).unwrap();
      toast.success('Uploaded!'); reset(); onClose?.();
    } catch (err) { toast.error(err || 'Upload failed'); }
  };

  const inputCls = 'w-full h-9 rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 text-sm text-zinc-200 placeholder-zinc-600 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-400 uppercase tracking-wider">Resume PDF *</label>
        <div className="rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-900/30 p-8 text-center hover:border-indigo-500/40 transition-colors">
          <Upload size={28} className="mx-auto text-zinc-600 mb-2" />
          <p className="text-sm text-zinc-500 mb-3">Drop your PDF or click to browse</p>
          <input type="file" accept="application/pdf" {...register('file', { required: 'Select a PDF' })}
            className="w-full text-sm text-zinc-400 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white file:cursor-pointer hover:file:bg-indigo-500" />
        </div>
        {errors.file && <p className="mt-1 text-xs text-red-400">{errors.file.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-400 uppercase tracking-wider">Description</label>
        <input {...register('description')} className={inputCls} placeholder="e.g., Updated for SDE-2 roles" />
      </div>
      <div className="flex gap-2 pt-2">
        <Button type="submit" loading={uploadStatus === 'loading'} className="flex-1">Upload Resume</Button>
        {onClose && <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>}
      </div>
    </form>
  );
};

export default ResumeUpload;
