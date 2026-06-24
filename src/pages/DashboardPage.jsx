/**
 * DashboardPage
 * 
 * Main dashboard showing stats, streak, topic progress, recent activity,
 * and overall preparation cards.
 * 
 * React Hooks Concept:
 * - useEffect: Fetches data when component mounts (dependency array = [])
 * - useSelector: Reads state from the Redux store
 * - useDispatch: Gets the dispatch function to trigger actions
 */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProblems } from '../redux/slices/problemSlice';
import { fetchInterviews } from '../redux/slices/interviewSlice';
import AppLayout from '../components/layout/AppLayout';
import Spinner from '../components/ui/Spinner';
import StatsCards from '../features/dashboard/StatsCards';
import StreakTracker from '../features/dashboard/StreakTracker';
import TopicProgress from '../features/dashboard/TopicProgress';
import RecentActivity from '../features/dashboard/RecentActivity';
import ProgressCards from '../features/dashboard/ProgressCards';
import useAuth from '../hooks/useAuth';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { items: problems, status: problemStatus } = useSelector((state) => state.problems);
  const { items: interviews } = useSelector((state) => state.interviews);

  // Fetch data on mount — the empty dependency array means this runs once
  useEffect(() => {
    if (user) {
      dispatch(fetchProblems(user.$id));
      dispatch(fetchInterviews(user.$id));
    }
  }, [dispatch, user]);

  return (
    <AppLayout title="Dashboard">
      {problemStatus === 'loading' && problems.length === 0 ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Welcome Banner */}
          <div className="rounded-2xl border border-gray-800 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 p-6">
            <h2 className="text-xl font-bold text-white">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Here&apos;s your interview preparation overview.
            </p>
          </div>

          {/* Stats Cards */}
          <StatsCards problems={problems} />

          {/* Streak + Topic Progress */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <StreakTracker problems={problems} />
            <TopicProgress problems={problems} />
          </div>

          {/* Recent Activity */}
          <RecentActivity problems={problems} />

          {/* Progress Cards */}
          <ProgressCards problems={problems} interviews={interviews} />
        </div>
      )}
    </AppLayout>
  );
};

export default DashboardPage;
