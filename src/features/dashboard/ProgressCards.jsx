import Card from '../../components/ui/Card';
import { calculateStats } from '../../utils/helpers';
import { Code2, Briefcase, Target } from 'lucide-react';

const ProgressCards = ({ problems, interviews }) => {
  const stats = calculateStats(problems);
  const pct = stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  const interviewCount = interviews?.length || 0;
  const upcoming = interviews?.filter(i => i.status === 'interview' || i.status === 'oa').length || 0;

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
      {/* Circular progress */}
      <Card className="flex items-center gap-5">
        <div className="relative flex-shrink-0">
          <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
            <circle cx="48" cy="48" r={radius} stroke="#27272a" strokeWidth="6" fill="none" />
            <circle cx="48" cy="48" r={radius} stroke="url(#grad)" strokeWidth="6" fill="none"
              strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out" />
            <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient></defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-zinc-100">{pct}%</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-300">DSA Progress</p>
          <p className="text-xs text-zinc-500 mt-1">{stats.solved} of {stats.total} solved</p>
          <p className="text-xs text-zinc-600 mt-0.5">{stats.unsolved} remaining</p>
        </div>
      </Card>

      {/* Problem breakdown */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Code2 size={16} className="text-indigo-400" />
          <h3 className="text-sm font-medium text-zinc-300">Difficulty Split</h3>
        </div>
        <div className="space-y-2.5">
          {[
            { label: 'Easy', val: stats.easy, color: 'bg-emerald-500', total: problems.filter(p=>p.difficulty==='easy').length },
            { label: 'Medium', val: stats.medium, color: 'bg-amber-500', total: problems.filter(p=>p.difficulty==='medium').length },
            { label: 'Hard', val: stats.hard, color: 'bg-red-500', total: problems.filter(p=>p.difficulty==='hard').length },
          ].map(d => (
            <div key={d.label} className="flex items-center gap-3">
              <span className={`h-2 w-2 rounded-full ${d.color}`} />
              <span className="text-xs text-zinc-400 w-14">{d.label}</span>
              <div className="flex-1 h-1.5 rounded-full bg-zinc-800">
                <div className={`h-1.5 rounded-full ${d.color} transition-all duration-500`}
                  style={{ width: d.total > 0 ? `${(d.val / d.total) * 100}%` : '0%' }} />
              </div>
              <span className="text-xs text-zinc-500 tabular-nums w-10 text-right">{d.val}/{d.total}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Interview stats */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Briefcase size={16} className="text-violet-400" />
          <h3 className="text-sm font-medium text-zinc-300">Interviews</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-zinc-800/50 p-3 text-center">
            <p className="text-xl font-bold text-zinc-100">{interviewCount}</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Total</p>
          </div>
          <div className="rounded-lg bg-zinc-800/50 p-3 text-center">
            <p className="text-xl font-bold text-amber-400">{upcoming}</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Active</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProgressCards;
