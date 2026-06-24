import Card from '../../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { groupBy } from '../../utils/helpers';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 shadow-xl text-xs"><p className="text-zinc-300">{label}: <span className="font-semibold text-zinc-100">{payload[0].value}</span></p></div>;
  }
  return null;
};

const TopicChart = ({ problems }) => {
  const solved = problems.filter(p => p.solved);
  const topicCounts = groupBy(solved, 'topic');
  const data = Object.entries(topicCounts)
    .map(([name, value]) => ({ name: name.length > 12 ? name.substring(0, 12) + '…' : name, value, fullName: name }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 12);

  return (
    <Card>
      <h3 className="text-sm font-medium text-zinc-300 mb-1">Topic Distribution</h3>
      <p className="text-xs text-zinc-600 mb-4">Problems solved by topic</p>
      {data.length === 0 ? (
        <p className="text-sm text-zinc-600 py-12 text-center">No data yet</p>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 0, right: 12, top: 0, bottom: 0 }}>
              <CartesianGrid horizontal={false} stroke="#27272a" />
              <XAxis type="number" tick={{ fill: '#52525b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(63,63,70,0.2)' }} />
              <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
};

export default TopicChart;
