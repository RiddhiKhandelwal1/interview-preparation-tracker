import Card from '../../components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { format, parseISO, subDays, isValid } from 'date-fns';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 shadow-xl text-xs"><p className="text-zinc-300">{label}: <span className="font-semibold text-zinc-100">{payload[0].value} solved</span></p></div>;
  }
  return null;
};

const TrendChart = ({ problems }) => {
  const solved = problems.filter(p => p.solved && p.dateSolved);
  const today = new Date();
  const days = 30;
  const data = Array.from({ length: days }, (_, i) => {
    const date = subDays(today, days - 1 - i);
    const key = format(date, 'yyyy-MM-dd');
    const count = solved.filter(p => { const d = parseISO(p.dateSolved); return isValid(d) && format(d, 'yyyy-MM-dd') === key; }).length;
    return { name: format(date, 'MMM d'), count };
  });

  return (
    <Card>
      <h3 className="text-sm font-medium text-zinc-300 mb-1">Solving Trend</h3>
      <p className="text-xs text-zinc-600 mb-4">Problems solved over 30 days</p>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: -20, right: 8, top: 4, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#27272a" />
            <XAxis dataKey="name" tick={{ fill: '#52525b', fontSize: 10 }} axisLine={false} tickLine={false} interval={6} />
            <YAxis tick={{ fill: '#52525b', fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} fill="url(#colorCount)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TrendChart;
