import Card from '../../components/ui/Card';
import { calculateStats, calculateStreak } from '../../utils/helpers';
import { Target, Flame, TrendingUp, Brain } from 'lucide-react';

const InsightsPanel = ({ problems }) => {
  const stats = calculateStats(problems);
  const solvedDates = problems.filter(p => p.solved && p.dateSolved).map(p => p.dateSolved);
  const streak = calculateStreak(solvedDates);
  const pct = stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0;
  const topics = [...new Set(problems.filter(p => p.solved).map(p => p.topic))].length;

  const insights = [
    { label: 'Completion', value: `${pct}%`, icon: Target, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Current Streak', value: `${streak} days`, icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: 'Solve Rate', value: `${stats.solved}/${stats.total}`, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Topics Covered', value: `${topics}`, icon: Brain, color: 'text-violet-400', bg: 'bg-violet-500/10' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {insights.map(i => {
        const Icon = i.icon;
        return (
          <Card key={i.label}>
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${i.bg} mb-3`}>
              <Icon size={16} className={i.color} />
            </div>
            <p className="text-xl font-bold text-zinc-100">{i.value}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{i.label}</p>
          </Card>
        );
      })}
    </div>
  );
};

export default InsightsPanel;
