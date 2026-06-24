import { Target, Zap, TrendingUp, Flame } from 'lucide-react';
import { calculateStats, calculateStreak } from '../../utils/helpers';
import { useEffect, useState, useRef } from 'react';

const AnimatedNumber = ({ value, duration = 800 }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (end === 0) { setDisplay(0); return; }
    const step = Math.max(1, Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setDisplay(start);
      if (start >= end) { clearInterval(timer); setDisplay(end); }
    }, step);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <span>{display}</span>;
};

const StatsCards = ({ problems }) => {
  const stats = calculateStats(problems);
  const solvedDates = problems.filter(p => p.solved && p.dateSolved).map(p => p.dateSolved);
  const streak = calculateStreak(solvedDates);

  const cards = [
    { label: 'Total Solved', value: stats.solved, sub: `of ${stats.total}`, icon: Target, color: 'text-indigo-400', bg: 'bg-indigo-500/10', ring: 'ring-indigo-500/20', pct: stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0, barColor: 'bg-indigo-500' },
    { label: 'Easy', value: stats.easy, icon: Zap, color: 'text-emerald-400', bg: 'bg-emerald-500/10', ring: 'ring-emerald-500/20', barColor: 'bg-emerald-500' },
    { label: 'Medium', value: stats.medium, icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/10', ring: 'ring-amber-500/20', barColor: 'bg-amber-500' },
    { label: 'Hard', value: stats.hard, icon: Flame, color: 'text-red-400', bg: 'bg-red-500/10', ring: 'ring-red-500/20', barColor: 'bg-red-500' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 stagger-children">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.label} className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 hover:border-zinc-700 transition-all duration-200 group">
            <div className="flex items-center justify-between mb-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${c.bg} ring-1 ${c.ring}`}>
                <Icon size={16} className={c.color} />
              </div>
              {c.pct !== undefined && (
                <span className="text-xs font-medium text-zinc-500">{c.pct}%</span>
              )}
            </div>
            <p className="text-2xl font-bold text-zinc-100 tracking-tight animate-counter">
              <AnimatedNumber value={c.value} />
              {c.sub && <span className="ml-1 text-sm font-normal text-zinc-600">{c.sub}</span>}
            </p>
            <p className="mt-0.5 text-xs text-zinc-500">{c.label}</p>
            {c.pct !== undefined && (
              <div className="mt-3 h-1 w-full rounded-full bg-zinc-800">
                <div className={`h-1 rounded-full ${c.barColor} transition-all duration-700 ease-out`}
                  style={{ width: `${c.pct}%` }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
