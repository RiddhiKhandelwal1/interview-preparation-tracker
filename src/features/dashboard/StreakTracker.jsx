/**
 * StreakTracker Component
 * 
 * Displays the user's current daily solving streak.
 * Calculates streak from an array of solved dates.
 */

import Card from '../../components/ui/Card';
import { calculateStreak } from '../../utils/helpers';

const StreakTracker = ({ problems }) => {
  const solvedDates = problems
    .filter((p) => p.solved && p.dateSolved)
    .map((p) => p.dateSolved);

  const streak = calculateStreak(solvedDates);

  // Generate last 7 days for visual display
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split('T')[0];
    const hasSolve = solvedDates.some((d) => d?.startsWith(dateStr));
    return {
      day: date.toLocaleDateString('en', { weekday: 'short' }),
      active: hasSolve,
    };
  });

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-300">Daily Streak</h3>
        <span className="text-2xl">🔥</span>
      </div>
      <div className="text-center mb-4">
        <p className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">
          {streak}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {streak === 1 ? 'day' : 'days'} in a row
        </p>
      </div>
      {/* 7-day activity indicator */}
      <div className="flex items-center justify-between gap-1">
        {last7Days.map((day, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1">
            <div
              className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all ${
                day.active
                  ? 'bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/25'
                  : 'bg-gray-800/50 text-gray-600'
              }`}
            >
              {day.active ? '✓' : '·'}
            </div>
            <span className="text-[10px] text-gray-500">{day.day}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StreakTracker;
