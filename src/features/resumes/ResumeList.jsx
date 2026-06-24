/**
 * ResumeList Component
 */

import { useSelector } from 'react-redux';
import ResumeCard from './ResumeCard';
import EmptyState from '../../components/ui/EmptyState';

const ResumeList = ({ onAdd }) => {
  const { items: resumes } = useSelector((state) => state.resumes);

  if (resumes.length === 0) {
    return (
      <EmptyState
        icon="📎"
        title="No resumes uploaded"
        description="Upload your resume PDFs to manage versions."
        actionLabel="Upload Resume"
        onAction={onAdd}
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {resumes.map((resume) => (
        <ResumeCard key={resume.$id} resume={resume} />
      ))}
    </div>
  );
};

export default ResumeList;
