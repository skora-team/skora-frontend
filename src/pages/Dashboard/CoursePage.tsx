import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import type { Lesson, RecommendationTarget } from '../../types/api.types';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { LessonNode } from '../../components/dashboard/LessonNode';
import { ChevronLeft, Loader2 } from 'lucide-react';

export function CoursePage() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set()); // Store completed lesson IDs
  const [recommendation, setRecommendation] = useState<RecommendationTarget | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;

    async function loadCourseData() {
      try {
        setLoading(true);
        
        // Fetch lessons, completions, and recommendation together.
        const [lessonsData, completionsData, nextRecommendation] = await Promise.all([
          api.getLessons(parseInt(courseId!)),
          api.getUserCompletions(),
          api.getNextLearningRecommendation().catch(() => null)
        ]);

        // Sort lessons by order_index
        const sortedLessons = lessonsData.sort((a, b) => a.order_index - b.order_index);
        setLessons(sortedLessons);

        // Convert completions to a Set for fast lookup
        const completedSet = new Set<number>(
          Array.isArray(completionsData) ? completionsData.map((c: any) => c.lesson_id) : []
        );
        setCompletedIds(completedSet);
        setRecommendation(nextRecommendation);

      } catch (err) {
        console.error("Error loading missions:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCourseData();
  }, [courseId]);

  return (
    <DashboardLayout>
      <Link to="/DashboardHome" className="inline-flex items-center text-[var(--text-muted)] hover:text-[var(--accent)] mb-8">
        <ChevronLeft size={20} />
        <span className="font-pixel text-xs ml-2 uppercase">Return to Base</span>
      </Link>

      <header className="mb-10">
        <h1 className="text-3xl font-pixel text-[var(--text-main)] mb-2 uppercase">
          Missions <span className="text-orange-500">Active</span>
        </h1>
        <p className="text-[var(--text-muted)] font-mono text-[10px]">
          // ADAPTIVE RECOMMENDATION ENGINE CONTROLS NEXT UNLOCK
        </p>
      </header>

      {recommendation && !recommendation.isComplete && recommendation.lessonId && recommendation.courseId && (
        <div className="mb-8 border border-[var(--accent)] bg-[var(--accent-glow)] px-4 py-4 font-mono text-xs text-[var(--text-main)] space-y-2">
          <div>
            {recommendation.courseId === Number(courseId)
              ? 'NEXT RECOMMENDED MISSION UNLOCKED:'
              : 'ADAPTIVE ENGINE RECOMMENDS YOUR NEXT MISSION IN ANOTHER TRACK:'}
            {' '}
            <Link
              to={`/course/${recommendation.courseId}/lesson/${recommendation.lessonId}`}
              className="font-bold text-[var(--accent)] underline"
            >
              {`LESSON ${recommendation.lessonId}`}
            </Link>
          </div>
          {recommendation.message && (
            <div className="text-[var(--text-main)]/90">{recommendation.message}</div>
          )}
          {recommendation.reason && (
            <div className="text-[var(--text-muted)]">REASON: {recommendation.reason}</div>
          )}
        </div>
      )}

      {loading ? (
        <div className="text-[var(--accent)] font-pixel animate-pulse">
          <Loader2 className="animate-spin inline mr-2"/> ESTABLISHING UPLINK...
        </div>
      ) : (
        <div className="max-w-2xl border-l-2 border-[var(--border-color)] ml-4 pl-4 relative">
          {lessons.map((lesson, index) => {
            const isCompleted = completedIds.has(lesson.id);
            const isRecommended = recommendation?.courseId === Number(courseId) && recommendation.lessonId === lesson.id;
            const isBootstrapLesson = completedIds.size === 0 && index === 0 && !recommendation?.lessonId;

            let status: 'locked' | 'unlocked' | 'completed' = 'locked';
            if (isCompleted) {
              status = 'completed';
            } else if (isRecommended || isBootstrapLesson) {
              status = 'unlocked';
            }

            return (
              <LessonNode 
                key={lesson.id} 
                lesson={lesson} 
                status={status} 
                isLast={index === lessons.length - 1} 
              />
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}