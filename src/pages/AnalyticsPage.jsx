import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProblems } from '../redux/slices/problemSlice';
import AppLayout from '../components/layout/AppLayout';
import { Skeleton } from '../components/ui/Spinner';
import DifficultyChart from '../features/analytics/DifficultyChart';
import TopicChart from '../features/analytics/TopicChart';
import TrendChart from '../features/analytics/TrendChart';
import InsightsPanel from '../features/analytics/InsightsPanel';
import AICoach from '../features/analytics/AICoach';
import useAuth from '../hooks/useAuth';
import { BarChart3 } from 'lucide-react';

const AnalyticsPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { items: problems, status } = useSelector((state) => state.problems);

  useEffect(() => { if (user) dispatch(fetchProblems(user.$id)); }, [dispatch, user]);

  return (
    <AppLayout title="Analytics">
      <div className="space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
            <BarChart3 size={16} className="text-emerald-400" />
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-zinc-100">Analytics</h2>
            <p className="text-xs text-zinc-500">Visualize your preparation progress</p>
          </div>
        </div>

        {status === 'loading' && problems.length === 0 ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3"><Skeleton className="h-64 rounded-xl" /><Skeleton className="h-64 rounded-xl" /></div>
          </div>
        ) : (
          <div className="space-y-4">
            <InsightsPanel problems={problems} />
            <AICoach problems={problems} />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <DifficultyChart problems={problems} />
              <TrendChart problems={problems} />
            </div>
            <TopicChart problems={problems} />
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default AnalyticsPage;
