/**
 * TopicChart Component
 * 
 * Horizontal bar chart showing problem count per topic.
 */

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Card from '../../components/ui/Card';
import { groupBy } from '../../utils/helpers';

const COLORS = [
  '#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd',
  '#10b981', '#34d399', '#6ee7b7',
  '#f59e0b', '#fbbf24', '#fcd34d',
  '#ef4444', '#f87171',
];

const TopicChart = ({ problems }) => {
  const solvedProblems = problems.filter((p) => p.solved);
  const topicCounts = groupBy(solvedProblems, 'topic');

  const data = Object.entries(topicCounts)
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 topics

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 shadow-xl">
          <p className="text-xs text-gray-200">
            {payload[0].payload.topic}: <strong>{payload[0].value}</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-gray-300">Topic Distribution</h3>
      {data.length === 0 ? (
        <p className="text-sm text-gray-500 py-8 text-center">No solved problems yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
            <XAxis type="number" tick={{ fontSize: 11, fill: '#6b7280' }} />
            <YAxis
              type="category"
              dataKey="topic"
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[0, 6, 6, 0]}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default TopicChart;
