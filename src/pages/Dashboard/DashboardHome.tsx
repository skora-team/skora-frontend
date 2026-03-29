import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import type { CourseProgress, CourseSummary } from '../../types/api.types';
import { Code2, Database, Terminal, PlayCircle, Loader2, AlertTriangle, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useDailyBonus } from '../../hooks/useDailyBonus';

const getIcon = (title: string) => {
  if (!title) return PlayCircle;
  const t = title.toLowerCase();
  if (t.includes('python')) return Code2;
  if (t.includes('sql')) return Database;
  if (t.includes('r')) return Terminal;
  return PlayCircle;
};

export function DashboardHome() {
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [progressByCourse, setProgressByCourse] = useState<Record<number, CourseProgress>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { bonus, claimBonus } = useDailyBonus();
  const [bonusXPClaimed, setBonusXPClaimed] = useState(false);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        console.log("Loading Dashboard Data...");
        
        // 1. Fetch Courses
        const coursesData = await api.getCourses();
        const courseList = Array.isArray(coursesData) ? coursesData : [];
        setCourses(courseList);

        // 2. Fetch per-course backend progress.
        try {
          const progressEntries = await Promise.all(
            courseList.map(async (course) => {
              const progress = await api.getCourseProgress(course.id);
              return [course.id, progress] as const;
            })
          );
          setProgressByCourse(Object.fromEntries(progressEntries));
        } catch (compError) {
          console.warn("Could not load course progress:", compError);
        }

      } catch (err: any) {
        setError(err.message || "Failed to connect.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <DashboardLayout>
      <header className="mb-12 border-b border-[var(--border-color)] pb-6 pixel-font">
        <h2 className="text-4xl text-[var(--text-main)] mb-4 leading-tight pixel-font">
          WELCOME <span className="text-[var(--accent)] ">OPERATOR</span>
        </h2>
        <p className="text-[var(--text-muted)] font-mono text-sm">
          // SELECT A TRAINING MODULE TO CONTINUE
        </p>
      </header>

      {/* DAILY BONUS CARD */}
      {!loading && !error && (
        <div className="mb-8">
          <div className={`border-2 rounded-lg p-6 transition-all ${
            bonus.eligibleToday
              ? 'bg-yellow-500/10 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]'
              : 'bg-gray-500/5 border-gray-500/30'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`text-4xl ${bonus.eligibleToday ? 'animate-bounce' : 'opacity-50'}`}>
                  ☀️
                </div>
                <div>
                  <p className="font-pixel text-xs text-[var(--text-muted)] uppercase tracking-tight">
                    Daily Login Bonus
                  </p>
                  <p className={`text-xl font-bold ${bonus.eligibleToday ? 'text-yellow-500' : 'text-gray-500'}`}>
                    {bonus.eligibleToday ? `+50 XP` : 'Come back tomorrow'}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
                    🔥 {bonus.daysInARow} days in a row {bonus.daysInARow >= 3 && '(Streak bonus active!)'}
                  </p>
                </div>
              </div>
              
              {bonus.eligibleToday && (
                <button
                  onClick={() => {
                    const xp = claimBonus();
                    if (xp > 0) {
                      setBonusXPClaimed(true);
                      setTimeout(() => setBonusXPClaimed(false), 2000);
                    }
                  }}
                  className="px-6 py-3 bg-yellow-500 text-black font-bold font-pixel text-sm rounded hover:bg-yellow-400 transition-all active:scale-95"
                >
                  💰 CLAIM
                </button>
              )}

              {bonusXPClaimed && (
                <div className="absolute right-6 text-green-500 font-bold animate-bounce">
                  ✓ +50 XP Claimed!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="bg-red-900/20 border border-red-500 text-red-400 p-6 rounded-lg flex items-center gap-4 mb-8">
          <AlertTriangle size={32} />
          <div><h3 className="font-bold">SYSTEM ERROR</h3><p className="text-sm font-mono">{error}</p></div>
        </div>
      )}

      {/* LOADING STATE */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-[var(--accent)]">
          <Loader2 size={48} className="animate-spin mb-4" />
          <h3 className="font-pixel text-xl animate-pulse">ESTABLISHING UPLINK...</h3>
        </div>
      )}

      {/* COURSES GRID */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const Icon = getIcon(course.title);
            const progress = progressByCourse[course.id];
            const progressPercent = progress?.progress_percent ?? 0;

            return (
              <Link 
                key={course.id} 
                to={`/course/${course.id}`} 
                className="group relative bg-[var(--bg-sidebar)] border-4 border-[var(--border-color)] p-6 hover:border-[var(--accent)] hover:-translate-y-2 transition-all duration-200 shadow-lg"
              >
                <div className="bg-[var(--bg-main)] w-14 h-14 flex items-center justify-center border-2 border-[var(--border-color)] mb-6 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] text-[var(--text-muted)] transition-all">
                  <Icon size={32} />
                </div>

                <h3 className="text-xl font-bold text-[var(--text-main)] mb-2 uppercase tracking-wider group-hover:text-[var(--accent)]">
                  {course.title || "Untitled Course"}
                </h3>
                
                <p className="text-xs text-[var(--text-muted)] mb-6 font-mono">
                  // {progressPercent}% SYNC COMPLETE
                </p>

                {/* THE PROGRESS BAR */}
                <div className="w-full bg-[var(--bg-main)] h-4 border border-[var(--border-color)] p-0.5 mb-2 rounded-sm relative overflow-hidden">
                  <div 
                    className="bg-orange-500 h-full shadow-[0_0_10px_#f97316] relative transition-all duration-1000"
                    style={{ width: `${progressPercent}%` }} // Dynamic Width
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>

                <div className="flex justify-between mt-2 text-[10px] font-pixel text-[var(--text-muted)]">
                  <span className="flex items-center gap-1"><TrendingUp size={10} /> LVL.{Math.floor(progressPercent / 10)}</span>
                  <span>ID: {course.id}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}