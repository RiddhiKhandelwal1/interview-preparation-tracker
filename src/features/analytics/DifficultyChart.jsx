import Card from '../../components/ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { calculateStats } from '../../utils/helpers';

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 shadow-xl text-xs"><span className="text-zinc-300">{payload[0].name}: </span><span className="font-semibold text-zinc-100">{payload[0].value}</span></div>;
  }
  return null;
};

const DifficultyChart = ({ problems }) => {
  const solved = problems.filter(p => p.solved);
  const stats = calculateStats(solved);
  const data = [
    { name: 'Easy', value: stats.easy, color: COLORS[0] },
    { name: 'Medium', value: stats.medium, color: COLORS[1] },
    { name: 'Hard', value: stats.hard, color: COLORS[2] },
  ].filter(d => d.value > 0);

  return (
    <Card>
      <h3 className="text-sm font-medium text-zinc-300 mb-1">Difficulty Distribution</h3>
      <p className="text-xs text-zinc-600 mb-4">Solved problems by difficulty</p>
      {data.length === 0 ? (
        <p className="text-sm text-zinc-600 py-12 text-center">No solved problems yet</p>
      ) : (
        <div className="flex items-center gap-6">
          <div className="w-40 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={42} outerRadius={64} paddingAngle={3} dataKey="value" strokeWidth={0}>
                  {data.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2.5">
            {data.map(d => (
              <div key={d.name} className="flex items-center gap-2.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-xs text-zinc-400 w-14">{d.name}</span>
                <span className="text-sm font-semibold text-zinc-200">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default DifficultyChart;
