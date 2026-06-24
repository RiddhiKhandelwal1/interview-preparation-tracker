/**
 * ProgressCards Component
 * 
 * Shows overall preparation metrics: platform distribution, interview pipeline, etc.
 */

import Card from '../../components/ui/Card';
import { PLATFORMS, INTERVIEW_STATUSES } from '../../utils/constants';

const ProgressCards = ({ problems, interviews }) => {
  // Platform distribution
  const platformCounts = PLATFORMS.map((p) => ({
    ...p,
    count: problems.filter((prob) => prob.platform === p.value).length,
  }));

  // Interview pipeline
  const interviewCounts = INTERVIEW_STATUSES.map((s) => ({
    ...s,
    count: interviews.filter((i) => i.status === s.value).length,
  }));

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Platform Distribution */}
      <Card>
        <h3 className="mb-4 text-sm font-semibold text-gray-300">Platform Distribution</h3>
        <div className="grid grid-cols-2 gap-3">
          {platformCounts.map((p) => (
            <div
              key={p.value}
              className="flex items-center gap-3 rounded-xl bg-gray-800/30 p-3"
            >
              <span className="text-xl">{p.icon}</span>
              <div>
                <p className="text-sm font-medium text-gray-200">{p.label}</p>
                <p className="text-lg font-bold text-white">{p.count}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Interview Pipeline */}
      <Card>
        <h3 className="mb-4 text-sm font-semibold text-gray-300">Interview Pipeline</h3>
        <div className="space-y-2">
          {interviewCounts.map((s) => (
            <div
              key={s.value}
              className="flex items-center justify-between rounded-xl bg-gray-800/30 p-3"
            >
              <div className="flex items-center gap-2">
                <span>{s.icon}</span>
                <span className="text-sm text-gray-300">{s.label}</span>
              </div>
              <span className="text-sm font-bold text-white">{s.count}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProgressCards;
