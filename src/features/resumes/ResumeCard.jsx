import { useDispatch } from 'react-redux';
import { deleteResume } from '../../redux/slices/resumeSlice';
import resumeService from '../../services/resumeService';
import Button from '../../components/ui/Button';
import { formatDate } from '../../utils/helpers';
import { Download, Trash2, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

const ResumeCard = ({ resume }) => {
  const dispatch = useDispatch();
  const handleDownload = () => { const url = resumeService.getDownloadUrl(resume.fileId); window.open(url, '_blank'); };
  const handleDelete = async () => {
    if (!window.confirm('Delete this resume?')) return;
    try { await dispatch(deleteResume({ resumeId: resume.$id, fileId: resume.fileId })).unwrap(); toast.success('Deleted'); } catch { toast.error('Failed'); }
  };

  return (
    <div className="group rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-4 hover:border-zinc-700/80 hover:bg-zinc-900/60 transition-all duration-150">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-400 flex-shrink-0">
          <FileText size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-zinc-200 truncate">{resume.fileName}</h3>
          {resume.description && <p className="text-xs text-zinc-500 mt-0.5">{resume.description}</p>}
          <p className="text-[11px] text-zinc-600 mt-1">Uploaded {formatDate(resume.uploadDate || resume.$createdAt)}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <Button variant="secondary" size="xs" onClick={handleDownload} className="flex-1"><Download size={13} /> Download</Button>
        <Button variant="danger" size="xs" onClick={handleDelete}><Trash2 size={13} /></Button>
      </div>
    </div>
  );
};

export default ResumeCard;
