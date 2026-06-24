/**
 * InsightsPanel Component
 * 
 * Key analytics insights and statistics summary.
 */

import Card from '../../components/ui/Card';
import { calculateStats, calculateStreak } from '../../utils/helpers';

const InsightsPanel = ({ problems }) => {
  const stats = calculateStats(problems);
  const solvedDates = problems.filter((p) => p.solved && p.dateSolved).map((p) => p.dateSolved);
  const streak = calculateStreak(solvedDates);

  // Most practiced topic
  const topicCounts = {};
  problems.filter((p) => p.solved).forEach((p) => {
    topicCounts[p.topic] = (topicCounts[p.topic] || 0) + 1;
  });
  const topTopic = Object.entries(topicCounts).sort((a, b) => b[1] - a[1])[0];

  // Most used platform
  const platformCounts = {};
  problems.forEach((p) => {
    platformCounts[p.platform] = (platformCounts[p.platform] || 0) + 1;
  });
  const topPlatform = Object.entries(platformCounts).sort((a, b) => b[1] - a[1])[0];

  const insights = [
    {
      label: 'Current Streak',
      value: `${streak} days`,
      icon: '🔥',
      color: 'from-orange-500 to-rose-500',
    },
    {
      label: 'Completion Rate',
      value: stats.total > 0 ? `${Math.round((stats.solved / stats.total) * 100)}%` : '0%',
      icon: '📊',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      label: 'Top Topic',
      value: topTopic ? topTopic[0] : 'N/A',
      icon: '🏆',
      color: 'from-emerald-500 to-green-500',
    },
    {
      label: 'Top Platform',
      value: topPlatform ? topPlatform[0] : 'N/A',
      icon: '💻',
      color: 'from-purple-500 to-violet-500',
    },
    {
      label: 'Easy/Med/Hard Ratio',
      value: `${stats.easy}/${stats.medium}/${stats.hard}`,
      icon: '⚖️',
      color: 'from-amber-500 to-orange-500',
    },
    {
      label: 'Total Problems',
      value: stats.total,
      icon: '📝',
      color: 'from-cyan-500 to-teal-500',
    },
  ];

  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-gray-300">Preparation Insights</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {insights.map((insight) => (
          <div
            key={insight.label}
            className="rounded-xl bg-gray-800/30 p-3 text-center"
          >
            <span className="text-xl">{insight.icon}</span>
            <p className={`mt-1 text-lg font-bold bg-gradient-to-r ${insight.color} bg-clip-text text-transparent`}>
              {insight.value}
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">{insight.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default InsightsPanel;
