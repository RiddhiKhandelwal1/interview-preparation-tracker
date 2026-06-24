import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProblems } from '../redux/slices/problemSlice';
import { fetchInterviews } from '../redux/slices/interviewSlice';
import AppLayout from '../components/layout/AppLayout';
import { Skeleton } from '../components/ui/Spinner';
import StatsCards from '../features/dashboard/StatsCards';
import StreakTracker from '../features/dashboard/StreakTracker';
import TopicProgress from '../features/dashboard/TopicProgress';
import RecentActivity from '../features/dashboard/RecentActivity';
import ProgressCards from '../features/dashboard/ProgressCards';
import useAuth from '../hooks/useAuth';
import { Sparkles } from 'lucide-react';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { items: problems, status: problemStatus } = useSelector((state) => state.problems);
  const { items: interviews } = useSelector((state) => state.interviews);

  useEffect(() => {
    if (user) {
      dispatch(fetchProblems(user.$id));
      dispatch(fetchInterviews(user.$id));
    }
  }, [dispatch, user]);

  const isLoading = problemStatus === 'loading' && problems.length === 0;

  return (
    <AppLayout title="Dashboard">
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full rounded-xl" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <Skeleton className="h-56 rounded-xl" />
            <Skeleton className="h-56 rounded-xl" />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Welcome Hero */}
          <div className="relative overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={16} className="text-indigo-400" />
                  <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">Overview</span>
                </div>
                <h2 className="text-xl font-semibold text-zinc-100 tracking-tight">
                  Welcome back, {user?.name?.split(' ')[0]}
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  {problems.filter(p => p.solved).length > 0
                    ? `You've solved ${problems.filter(p => p.solved).length} problems. Keep the momentum going!`
                    : 'Start tracking your preparation to see progress here.'}
                </p>
              </div>
            </div>
          </div>

          <StatsCards problems={problems} />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <StreakTracker problems={problems} />
            <TopicProgress problems={problems} />
          </div>

          <RecentActivity problems={problems} />
          <ProgressCards problems={problems} interviews={interviews} />
        </div>
      )}
    </AppLayout>
  );
};

export default DashboardPage;
