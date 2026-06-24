/**
 * ResumeCard Component
 * 
 * Displays a resume entry with download and delete actions.
 * Uses Appwrite Storage to generate download URLs.
 */

import { useDispatch } from 'react-redux';
import { deleteResume } from '../../redux/slices/resumeSlice';
import resumeService from '../../services/resumeService';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

const ResumeCard = ({ resume }) => {
  const dispatch = useDispatch();

  const handleDownload = () => {
    // getDownloadUrl returns a URL object from Appwrite SDK
    const url = resumeService.getDownloadUrl(resume.fileId);
    window.open(url, '_blank');
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this resume?')) return;
    try {
      await dispatch(
        deleteResume({ resumeId: resume.$id, fileId: resume.fileId })
      ).unwrap();
      toast.success('Resume deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <Card hover className="group">
      <div className="flex items-start gap-4">
        {/* File icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-xl flex-shrink-0">
          📄
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-100 truncate">{resume.fileName}</h3>
          {resume.description && (
            <p className="text-xs text-gray-400 mt-1">{resume.description}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Uploaded {formatDate(resume.uploadDate || resume.$createdAt)}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <Button variant="secondary" size="sm" onClick={handleDownload} className="flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download
        </Button>
        <Button variant="ghost" size="sm" onClick={handleDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rose-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </Button>
      </div>
    </Card>
  );
};

export default ResumeCard;
