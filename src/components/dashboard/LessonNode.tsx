import { Link } from 'react-router-dom';
import { Lock, CheckCircle2, Circle } from 'lucide-react';
import type { Lesson } from '../../types/api.types';

interface LessonNodeProps {
  lesson: Lesson;
  status: 'locked' | 'unlocked' | 'completed';
  isLast: boolean;
}

export function LessonNode({ lesson, status, isLast }: LessonNodeProps) {
  const isLocked = status === 'locked';

  const styles = {
    locked: { 
      border: 'border-[var(--border-color)]', 
      bg: 'bg-[var(--bg-sidebar)] opacity-60', 
      text: 'text-[var(--text-muted)]', 
      icon: <Lock size={16} />, 
      line: 'bg-[var(--border-color)]',
      cursor: 'cursor-not-allowed'
    },
    unlocked: { 
      border: 'border-[var(--accent)]', 
      bg: 'bg-[var(--accent-glow)]', 
      text: 'text-[var(--text-main)]', 
      icon: <Circle size={16} className="text-[var(--accent)] animate-pulse" />, 
      line: 'bg-[var(--border-color)]',
      cursor: 'cursor-pointer'
    },
    completed: { 
      border: 'border-green-500', 
      bg: 'bg-green-500/10', 
      text: 'text-green-500', 
      icon: <CheckCircle2 size={16} className="text-green-500" />, 
      line: 'bg-green-500',
      cursor: 'cursor-pointer'
    }
  };

  const currentStyle = styles[status];

  // Component that wraps the card content
  // If locked, we use a <div> so it's not clickable.
  // If unlocked/completed, we use a <Link>.
  const CardWrapper = isLocked ? 'div' : Link;

  return (
    <div className="flex relative pl-8 pb-12">
      {!isLast && (
        <div className={`absolute left-[11px] top-8 w-[2px] h-full ${currentStyle.line} transition-colors duration-500`} />
      )}
      
      <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 ${currentStyle.border} bg-[var(--bg-main)] flex items-center justify-center z-10`}>
        {currentStyle.icon}
      </div>

      <CardWrapper 
        {...(!isLocked ? { to: `/course/${lesson.course_id}/lesson/${lesson.id}` } : {})}
        className={`flex-1 ml-4 p-4 border-l-2 ${currentStyle.border} ${currentStyle.bg} ${currentStyle.cursor} transition-all group block select-none`}
      >
        <div className="flex justify-between items-start">
          <h3 className={`font-bold font-pixel text-sm uppercase tracking-wider ${currentStyle.text}`}>
            {lesson.title}
          </h3>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">
            IDX: {lesson.order_index}
          </span>
        </div>
        
        <p className="text-xs text-[var(--text-muted)] mt-2 font-mono">
          {isLocked ? '// ACCESS DENIED' : '// CLICK TO START MISSION'}
        </p>

        {/* Visual feedback for locked state */}
        {isLocked && (
          <div className="mt-4 h-1 w-full bg-white/5 overflow-hidden">
            <div className="h-full w-1/3 bg-red-500/20 animate-[move_2s_linear_infinite]" 
                 style={{ 
                   backgroundImage: 'linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.5), transparent)',
                   backgroundSize: '200% 100%' 
                 }} 
            />
          </div>
        )}
      </CardWrapper>
    </div>
  );
}