import { Link } from 'react-router-dom';
import { Lock, CheckCircle2, Circle } from 'lucide-react';
import type { Lesson } from '../../types/api.types';

interface LessonNodeProps {
  lesson: Lesson;
  status: 'locked' | 'unlocked' | 'completed';
  isLast: boolean;
}

export function LessonNode({ lesson, status, isLast }: LessonNodeProps) {
  const styles = {
    locked: { border: 'border-[var(--border-color)]', bg: 'bg-[var(--bg-sidebar)]', text: 'text-[var(--text-muted)]', icon: <Lock size={16} />, line: 'bg-[var(--border-color)]' },
    unlocked: { border: 'border-[var(--accent)]', bg: 'bg-[var(--accent-glow)]', text: 'text-[var(--text-main)]', icon: <Circle size={16} className="text-[var(--accent)] animate-pulse" />, line: 'bg-[var(--border-color)]' },
    completed: { border: 'border-green-500', bg: 'bg-green-500/10', text: 'text-green-500', icon: <CheckCircle2 size={16} className="text-green-500" />, line: 'bg-green-500' }
  };
  const currentStyle = styles[status];

  return (
    <div className="flex relative pl-8 pb-12">
      {!isLast && <div className={`absolute left-[11px] top-8 w-[2px] h-full ${currentStyle.line} transition-colors duration-500`} />}
      <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 ${currentStyle.border} bg-[var(--bg-main)] flex items-center justify-center z-10`}>{currentStyle.icon}</div>
      <Link to={`/course/${lesson.course_id}/lesson/${lesson.id}`} className={`flex-1 ml-4 p-4 border-l-2 ${currentStyle.border} ${currentStyle.bg} hover:bg-[var(--bg-sidebar)] transition-all cursor-pointer group block`}>
        <div className="flex justify-between items-start">
          <h3 className={`font-bold font-pixel text-sm uppercase tracking-wider ${currentStyle.text}`}>{lesson.title}</h3>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">IDX: {lesson.order_index}</span>
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-2 font-mono">{status === 'locked' ? '// ACCESS DENIED' : '// CLICK TO START MISSION'}</p>
      </Link>
    </div>
  );
}