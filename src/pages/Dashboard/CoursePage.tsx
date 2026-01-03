import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import type { Lesson } from '../../types/api.types';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { LessonNode } from '../../components/dashboard/LessonNode';
import { ChevronLeft, Loader2 } from 'lucide-react';

export function CoursePage() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;
    setLoading(true);
    api.getLessons(parseInt(courseId))
      .then((data) => setLessons(data.sort((a, b) => a.order_index - b.order_index)))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [courseId]);

  return (
    <DashboardLayout>
      <Link to="/DashboardHome" className="inline-flex items-center text-[var(--text-muted)] hover:text-[var(--accent)] mb-8"><ChevronLeft size={20} /><span className="font-pixel text-xs ml-2">RETURN TO BASE</span></Link>
      <header className="mb-10"><h1 className="text-3xl font-pixel text-[var(--text-main)] mb-2">MISSION LOG: <span className="text-orange-500">SEQ {courseId}</span></h1></header>
      {loading ? <div className="text-[var(--accent)] font-pixel animate-pulse"><Loader2 className="animate-spin inline mr-2"/> LOADING...</div> : (
        <div className="max-w-2xl border-l-2 border-[var(--border-color)] ml-4 pl-4">
          {lessons.map((lesson, index) => (
            <LessonNode key={lesson.id} lesson={lesson} status={index === 0 ? 'unlocked' : 'locked'} isLast={index === lessons.length - 1} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}