import { useSelector } from 'react-redux';
import ResumeCard from './ResumeCard';
import EmptyState from '../../components/ui/EmptyState';
import { FileText } from 'lucide-react';

const ResumeList = ({ onAdd }) => {
  const { items: resumes } = useSelector((state) => state.resumes);

  if (resumes.length === 0) {
    return <EmptyState icon={<FileText size={32} className="text-zinc-500" />} title="No resumes uploaded" description="Upload your first resume to get started" actionLabel="Upload Resume" onAction={onAdd} />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {resumes.map(r => <ResumeCard key={r.$id} resume={r} />)}
    </div>
  );
};

export default ResumeList;
