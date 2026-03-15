import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, auth } from '../../services/api'; // Added auth to get current operator
import type { Lesson } from '../../types/api.types';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { LessonNode } from '../../components/dashboard/LessonNode';
import { ChevronLeft, Loader2 } from 'lucide-react';

export function CoursePage() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set()); // Store completed lesson IDs
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;

    async function loadCourseData() {
      try {
        setLoading(true);
        
        // Fetch lessons and completions at the same time
        const [lessonsData, completionsData] = await Promise.all([
          api.getLessons(parseInt(courseId!)),
          api.getUserCompletions() // This uses the ID from localStorage automatically
        ]);

        // Sort lessons by order_index
        const sortedLessons = lessonsData.sort((a, b) => a.order_index - b.order_index);
        setLessons(sortedLessons);

        // Convert completions to a Set for fast lookup
        const completedSet = new Set<number>(
          Array.isArray(completionsData) ? completionsData.map((c: any) => c.lesson_id) : []
        );
        setCompletedIds(completedSet);

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
          // COMPLETE PREVIOUS MODULES TO UNLOCK NEXT SEQUENCE
        </p>
      </header>

      {loading ? (
        <div className="text-[var(--accent)] font-pixel animate-pulse">
          <Loader2 className="animate-spin inline mr-2"/> ESTABLISHING UPLINK...
        </div>
      ) : (
        <div className="max-w-2xl border-l-2 border-[var(--border-color)] ml-4 pl-4 relative">
          {lessons.map((lesson, index) => {
            // --- PROGRESS LOGIC ---
            // 1. First lesson is always unlocked
            // 2. Other lessons are unlocked ONLY if the lesson before it is completed
            const isFirstLesson = index === 0;
            const prevLessonId = index > 0 ? lessons[index - 1].id : null;
            const prevLessonCompleted = prevLessonId ? completedIds.has(prevLessonId) : false;
            
            const isUnlocked = isFirstLesson || prevLessonCompleted;
            const status = isUnlocked ? 'unlocked' : 'locked';

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