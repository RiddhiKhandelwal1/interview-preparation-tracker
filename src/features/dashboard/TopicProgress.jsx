import Card from '../../components/ui/Card';
import { groupBy } from '../../utils/helpers';
import { TOPICS } from '../../utils/constants';

const TopicProgress = ({ problems }) => {
  const solved = problems.filter(p => p.solved);
  const topicCounts = groupBy(solved, 'topic');
  const allCounts = groupBy(problems, 'topic');

  const topicData = TOPICS
    .map(t => ({ name: t, solved: topicCounts[t] || 0, total: allCounts[t] || 0 }))
    .filter(t => t.total > 0)
    .sort((a, b) => b.solved - a.solved)
    .slice(0, 8);

  const maxVal = Math.max(...topicData.map(t => t.total), 1);

  return (
    <Card>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-medium text-zinc-300">Topic Progress</h3>
          <p className="text-xs text-zinc-600 mt-0.5">Top {topicData.length} practiced topics</p>
        </div>
      </div>

      {topicData.length === 0 ? (
        <p className="text-sm text-zinc-600 py-8 text-center">No problems solved yet</p>
      ) : (
        <div className="space-y-3">
          {topicData.map(t => {
            const pct = t.total > 0 ? Math.round((t.solved / t.total) * 100) : 0;
            return (
              <div key={t.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-zinc-400 truncate">{t.name}</span>
                  <span className="text-[11px] text-zinc-500 tabular-nums ml-2">{t.solved}/{t.total}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-zinc-800/80">
                  <div className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
                    style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default TopicProgress;
