/**
 * TrendChart Component
 * 
 * Line chart showing solved problems over time (by week).
 */

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Card from '../../components/ui/Card';
import { format, parseISO, startOfWeek, isValid } from 'date-fns';

const TrendChart = ({ problems }) => {
  const solvedProblems = problems.filter((p) => p.solved && p.dateSolved);

  // Group by week
  const weeklyData = {};
  solvedProblems.forEach((p) => {
    const date = parseISO(p.dateSolved);
    if (!isValid(date)) return;
    const weekStart = format(startOfWeek(date), 'MMM dd');
    weeklyData[weekStart] = (weeklyData[weekStart] || 0) + 1;
  });

  const data = Object.entries(weeklyData)
    .map(([week, count]) => ({ week, count }))
    .slice(-12); // Last 12 weeks

  // Calculate cumulative
  let cumulative = 0;
  const cumulativeData = data.map((d) => {
    cumulative += d.count;
    return { ...d, cumulative };
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 shadow-xl">
          <p className="text-xs text-gray-400">{payload[0].payload.week}</p>
          <p className="text-xs text-gray-200">
            Solved: <strong>{payload[0].payload.count}</strong>
          </p>
          <p className="text-xs text-indigo-400">
            Total: <strong>{payload[0].payload.cumulative}</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-gray-300">Solved Problems Trend</h3>
      {cumulativeData.length === 0 ? (
        <p className="text-sm text-gray-500 py-8 text-center">No solved problems with dates yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={cumulativeData}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#6b7280' }} />
            <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="cumulative"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#colorGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default TrendChart;
