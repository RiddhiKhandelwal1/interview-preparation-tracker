/**
 * TopicProgress Component
 * 
 * Shows progress bars for each DSA topic.
 */

import Card from '../../components/ui/Card';
import { TOPICS } from '../../utils/constants';

const TopicProgress = ({ problems }) => {
  // Calculate solved count per topic
  const topicStats = TOPICS.map((topic) => {
    const total = problems.filter((p) => p.topic === topic).length;
    const solved = problems.filter((p) => p.topic === topic && p.solved).length;
    return { topic, total, solved };
  }).filter((t) => t.total > 0) // Only show topics that have problems
    .sort((a, b) => b.total - a.total); // Sort by most problems

  const colors = [
    'from-indigo-500 to-blue-500',
    'from-emerald-500 to-green-500',
    'from-amber-500 to-orange-500',
    'from-rose-500 to-pink-500',
    'from-purple-500 to-violet-500',
    'from-cyan-500 to-teal-500',
  ];

  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-gray-300">Topic Progress</h3>
      {topicStats.length === 0 ? (
        <p className="text-sm text-gray-500 py-4 text-center">No problems added yet</p>
      ) : (
        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
          {topicStats.map((stat, idx) => (
            <div key={stat.topic}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-400">{stat.topic}</span>
                <span className="text-gray-500">
                  {stat.solved}/{stat.total}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-gray-800">
                <div
                  className={`h-1.5 rounded-full bg-gradient-to-r ${colors[idx % colors.length]} transition-all duration-500`}
                  style={{ width: stat.total > 0 ? `${(stat.solved / stat.total) * 100}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default TopicProgress;
