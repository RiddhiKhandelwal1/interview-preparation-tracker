/**
 * DifficultyChart Component
 * 
 * Pie chart showing distribution of solved problems by difficulty.
 * Uses Recharts — a composable React charting library.
 */

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Card from '../../components/ui/Card';

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

const DifficultyChart = ({ problems }) => {
  const solvedProblems = problems.filter((p) => p.solved);

  const data = [
    { name: 'Easy', value: solvedProblems.filter((p) => p.difficulty === 'easy').length },
    { name: 'Medium', value: solvedProblems.filter((p) => p.difficulty === 'medium').length },
    { name: 'Hard', value: solvedProblems.filter((p) => p.difficulty === 'hard').length },
  ].filter((d) => d.value > 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 shadow-xl">
          <p className="text-xs text-gray-200">
            {payload[0].name}: <strong>{payload[0].value}</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-gray-300">Difficulty Distribution</h3>
      {data.length === 0 ? (
        <p className="text-sm text-gray-500 py-8 text-center">No solved problems yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              formatter={(value) => <span className="text-xs text-gray-400">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default DifficultyChart;
