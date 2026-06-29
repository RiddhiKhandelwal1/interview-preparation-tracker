import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, ChevronUp, Loader2, Target, BookOpen, Calendar, Lightbulb, TrendingUp, AlertCircle } from 'lucide-react';
import { getAICoachingPlan } from '../../services/geminiService';
import Card from '../../components/ui/Card';

const difficultyColors = {
  easy: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  medium: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  hard: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
};

const readinessStyles = {
  Beginner:     { bg: 'bg-sky-500/10',     text: 'text-sky-400',     border: 'border-sky-500/20',     dot: 'bg-sky-400' },
  Intermediate: { bg: 'bg-violet-500/10',  text: 'text-violet-400',  border: 'border-violet-500/20',  dot: 'bg-violet-400' },
  Advanced:     { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', dot: 'bg-emerald-400' },
};

const tagColors = [
  'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
  'bg-violet-500/10 text-violet-400 border border-violet-500/20',
  'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
];

const AICoach = ({ problems }) => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(true);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setPlan(null);
    try {
      const result = await getAICoachingPlan(problems);
      setPlan(result);
      setExpanded(true);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const diff = plan?.nextDifficultyTarget;
  const diffStyle = diff ? difficultyColors[diff] : null;

  return (
    <div className="relative overflow-hidden rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-zinc-900/60 to-violet-950/30">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-indigo-600/8 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-violet-600/8 blur-[60px]" />

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-zinc-100">AI Study Coach</h3>
              <p className="text-xs text-zinc-500">Powered by Gemini · Personalized for your data</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {plan && (
              <button
                onClick={() => setExpanded((e) => !e)}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-colors cursor-pointer"
              >
                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {expanded ? 'Collapse' : 'Expand'}
              </button>
            )}
            <button
              onClick={handleGenerate}
              disabled={loading || problems.length === 0}
              className="relative inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Sparkles size={13} />
              )}
              {loading ? 'Analyzing...' : plan ? 'Regenerate' : 'Generate My Plan'}
            </button>
          </div>
        </div>

        {/* Empty state prompt */}
        {!plan && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4"
          >
            <p className="text-sm text-zinc-500 leading-relaxed">
              Click <span className="text-indigo-400 font-medium">Generate My Plan</span> to get a personalized study roadmap — Gemini will analyze your solve rate, streak, topic gaps, and difficulty distribution to recommend exactly what to practice next.
            </p>
          </motion.div>
        )}

        {/* Error state */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4"
            >
              <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-300">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading skeleton */}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 rounded-full bg-zinc-800/80 animate-pulse" style={{ width: `${85 - i * 10}%` }} />
            ))}
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence>
          {plan && expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mt-5 space-y-4 overflow-hidden"
            >
              {/* Summary */}
              <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4">
                <p className="text-sm text-zinc-300 leading-relaxed">{plan.summary}</p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {/* Interview Readiness */}
                {plan.interviewReadiness && (() => {
                  const rs = readinessStyles[plan.interviewReadiness] || readinessStyles.Beginner;
                  return (
                    <div className={`flex items-center gap-3 rounded-xl border p-3.5 ${rs.bg} ${rs.border}`}>
                      <div className={`h-2 w-2 rounded-full flex-shrink-0 ${rs.dot} ring-2 ring-offset-1 ring-offset-zinc-900 ${rs.dot}/40`} />
                      <div>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">Readiness</p>
                        <p className={`text-sm font-semibold ${rs.text}`}>{plan.interviewReadiness}</p>
                      </div>
                    </div>
                  );
                })()}

                {/* Next difficulty */}
                {diffStyle && (
                  <div className={`flex items-center gap-3 rounded-xl border p-3.5 ${diffStyle.bg} ${diffStyle.border}`}>
                    <Target size={16} className={diffStyle.text} />
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">Next Difficulty</p>
                      <p className={`text-sm font-semibold capitalize ${diffStyle.text}`}>{plan.nextDifficultyTarget}</p>
                    </div>
                  </div>
                )}

                {/* Weekly goal */}
                <div className="flex items-center gap-3 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-3.5">
                  <Calendar size={16} className="text-cyan-400" />
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">Weekly Goal</p>
                    <p className="text-sm font-semibold text-zinc-200">{plan.weeklyGoal}</p>
                  </div>
                </div>

                {/* Tip */}
                <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5">
                  <Lightbulb size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-200/80 leading-relaxed">{plan.tip}</p>
                </div>
              </div>

              {/* Focus Topics */}
              {plan.focusTopics?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <BookOpen size={13} className="text-zinc-500" />
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Focus Topics</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {plan.focusTopics.map((topic, i) => (
                      <span key={topic} className={`rounded-full px-3 py-1 text-xs font-medium ${tagColors[i % tagColors.length]}`}>
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Daily Plan */}
              {plan.dailyPlan?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <TrendingUp size={13} className="text-zinc-500" />
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">7-Day Roadmap</p>
                  </div>
                  <div className="space-y-2">
                    {plan.dailyPlan.map((item, i) => (
                      <motion.div
                        key={item.day}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-3 rounded-lg border border-zinc-800/50 bg-zinc-900/30 px-3.5 py-2.5"
                      >
                        <span className="mt-0.5 min-w-[56px] text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">{item.day}</span>
                        <span className="text-sm text-zinc-300">{item.task}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AICoach;
