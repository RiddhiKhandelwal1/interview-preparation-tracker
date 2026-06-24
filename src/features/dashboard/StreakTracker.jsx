import Card from '../../components/ui/Card';
import { calculateStreak } from '../../utils/helpers';
import { Flame } from 'lucide-react';
import { format, subDays, parseISO, isValid } from 'date-fns';

const StreakTracker = ({ problems }) => {
  const solvedDates = problems.filter(p => p.solved && p.dateSolved).map(p => p.dateSolved);
  const streak = calculateStreak(solvedDates);

  // Build last 30 days heatmap
  const today = new Date();
  const solvedSet = new Set(solvedDates.map(d => { const p = parseISO(d); return isValid(p) ? format(p, 'yyyy-MM-dd') : null; }).filter(Boolean));
  const days = Array.from({ length: 30 }, (_, i) => {
    const date = subDays(today, 29 - i);
    const key = format(date, 'yyyy-MM-dd');
    return { date, key, solved: solvedSet.has(key), label: format(date, 'EEE'), day: format(date, 'd') };
  });

  return (
    <Card>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-medium text-zinc-300">Daily Streak</h3>
          <p className="text-xs text-zinc-600 mt-0.5">Last 30 days activity</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-orange-500/10 px-3 py-1.5">
          <Flame size={16} className="text-orange-400" />
          <span className="text-lg font-bold text-orange-400">{streak}</span>
          <span className="text-xs text-orange-400/70">days</span>
        </div>
      </div>

      <div className="grid grid-cols-10 gap-1.5">
        {days.map((d) => (
          <div key={d.key} className="group relative">
            <div className={`aspect-square rounded-[4px] transition-all duration-150 ${
              d.solved
                ? 'bg-indigo-500/80 hover:bg-indigo-400 shadow-sm shadow-indigo-500/30'
                : 'bg-zinc-800/60 hover:bg-zinc-700/60'
            }`} />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-[10px] text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              {format(d.date, 'MMM d')} · {d.solved ? 'Active' : 'No activity'}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-2 mt-3">
        <span className="text-[10px] text-zinc-600">Less</span>
        <div className="flex gap-1">
          <div className="h-2.5 w-2.5 rounded-[2px] bg-zinc-800/60" />
          <div className="h-2.5 w-2.5 rounded-[2px] bg-indigo-500/40" />
          <div className="h-2.5 w-2.5 rounded-[2px] bg-indigo-500/80" />
        </div>
        <span className="text-[10px] text-zinc-600">More</span>
      </div>
    </Card>
  );
};

export default StreakTracker;
