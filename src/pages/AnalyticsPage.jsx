/**
 * AnalyticsPage
 * 
 * Data visualization and insights page.
 */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProblems } from '../redux/slices/problemSlice';
import AppLayout from '../components/layout/AppLayout';
import Spinner from '../components/ui/Spinner';
import DifficultyChart from '../features/analytics/DifficultyChart';
import TopicChart from '../features/analytics/TopicChart';
import TrendChart from '../features/analytics/TrendChart';
import InsightsPanel from '../features/analytics/InsightsPanel';
import useAuth from '../hooks/useAuth';

const AnalyticsPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { items: problems, status } = useSelector((state) => state.problems);

  useEffect(() => {
    if (user) dispatch(fetchProblems(user.$id));
  }, [dispatch, user]);

  return (
    <AppLayout title="Analytics">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Analytics</h2>
          <p className="text-sm text-gray-400">Visualize your preparation progress</p>
        </div>

        {status === 'loading' && problems.length === 0 ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Insights Panel */}
            <InsightsPanel problems={problems} />

            {/* Charts Row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <DifficultyChart problems={problems} />
              <TrendChart problems={problems} />
            </div>

            {/* Topic Chart (full width) */}
            <TopicChart problems={problems} />
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default AnalyticsPage;
