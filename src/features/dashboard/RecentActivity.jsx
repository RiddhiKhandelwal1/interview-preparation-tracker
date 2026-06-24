import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { timeAgo } from '../../utils/helpers';
import { CheckCircle2, Clock } from 'lucide-react';

const RecentActivity = ({ problems }) => {
  const recent = [...problems]
    .sort((a, b) => new Date(b.$updatedAt) - new Date(a.$updatedAt))
    .slice(0, 6);

  return (
    <Card>
      <h3 className="text-sm font-medium text-zinc-300 mb-4">Recent Activity</h3>
      {recent.length === 0 ? (
        <p className="text-sm text-zinc-600 py-8 text-center">No recent activity</p>
      ) : (
        <div className="space-y-0.5">
          {recent.map((p) => (
            <div key={p.$id} className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-zinc-800/40 transition-colors group">
              <div className={`flex h-7 w-7 items-center justify-center rounded-md flex-shrink-0 ${p.solved ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                {p.solved ? <CheckCircle2 size={14} /> : <Clock size={14} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-zinc-300 truncate">{p.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant={p.difficulty}>{p.difficulty}</Badge>
                  <span className="text-[11px] text-zinc-600">{p.topic}</span>
                </div>
              </div>
              <span className="text-[11px] text-zinc-600 flex-shrink-0">{timeAgo(p.$updatedAt)}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentActivity;
