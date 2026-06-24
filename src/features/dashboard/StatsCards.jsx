/**
 * StatsCards Component
 * 
 * Displays key statistics: total solved, easy/medium/hard counts.
 * Uses calculated stats from the problems array in Redux.
 */

import Card from '../../components/ui/Card';
import { calculateStats } from '../../utils/helpers';

const StatsCards = ({ problems }) => {
  const stats = calculateStats(problems);

  const cards = [
    {
      label: 'Total Solved',
      value: stats.solved,
      total: stats.total,
      color: 'from-indigo-500 to-blue-600',
      shadow: 'shadow-indigo-500/20',
      icon: '🎯',
    },
    {
      label: 'Easy',
      value: stats.easy,
      color: 'from-emerald-500 to-green-600',
      shadow: 'shadow-emerald-500/20',
      icon: '🟢',
    },
    {
      label: 'Medium',
      value: stats.medium,
      color: 'from-amber-500 to-orange-600',
      shadow: 'shadow-amber-500/20',
      icon: '🟡',
    },
    {
      label: 'Hard',
      value: stats.hard,
      color: 'from-rose-500 to-red-600',
      shadow: 'shadow-rose-500/20',
      icon: '🔴',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className={`relative overflow-hidden ${card.shadow} shadow-lg`}>
          {/* Gradient accent bar */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color}`} />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">{card.label}</p>
              <p className="mt-1 text-3xl font-bold text-white">
                {card.value}
                {card.total !== undefined && (
                  <span className="text-base font-normal text-gray-500">/{card.total}</span>
                )}
              </p>
            </div>
            <span className="text-2xl">{card.icon}</span>
          </div>
          {/* Progress bar for total solved */}
          {card.total !== undefined && card.total > 0 && (
            <div className="mt-4">
              <div className="h-1.5 w-full rounded-full bg-gray-800">
                <div
                  className={`h-1.5 rounded-full bg-gradient-to-r ${card.color} transition-all duration-500`}
                  style={{ width: `${(card.value / card.total) * 100}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {card.total > 0 ? Math.round((card.value / card.total) * 100) : 0}% complete
              </p>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
