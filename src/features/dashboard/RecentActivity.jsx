/**
 * RecentActivity Component
 * 
 * Shows the last 10 recently solved/added problems.
 */

import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { timeAgo } from '../../utils/helpers';

const RecentActivity = ({ problems }) => {
  const recent = [...problems]
    .sort((a, b) => new Date(b.$updatedAt) - new Date(a.$updatedAt))
    .slice(0, 8);

  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-gray-300">Recent Activity</h3>
      {recent.length === 0 ? (
        <p className="text-sm text-gray-500 py-4 text-center">No activity yet</p>
      ) : (
        <div className="space-y-3">
          {recent.map((problem) => (
            <div
              key={problem.$id}
              className="flex items-center gap-3 rounded-xl bg-gray-800/30 p-3 transition-colors hover:bg-gray-800/50"
            >
              {/* Status indicator */}
              <div
                className={`h-2 w-2 rounded-full flex-shrink-0 ${
                  problem.solved ? 'bg-emerald-500' : 'bg-gray-600'
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-200 truncate">{problem.title}</p>
                <p className="text-xs text-gray-500">{timeAgo(problem.$updatedAt)}</p>
              </div>
              <Badge variant={problem.difficulty}>
                {problem.difficulty}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentActivity;
