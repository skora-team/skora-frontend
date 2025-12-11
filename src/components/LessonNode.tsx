import { Link } from 'react-router-dom';
import type { Lesson } from '../types';
import clsx from 'clsx';
import { Lock } from 'lucide-react';

interface LessonNodeProps {
  lesson: Lesson;
  colorTheme: 'yellow' | 'blue' | 'orange';
}

const themes = {
  yellow: {
    bg: 'bg-[#fbbf24]', // Amber-400
    border: 'border-[#b45309]', // Amber-700
    text: 'text-black',
  },
  blue: {
    bg: 'bg-[#3b82f6]', // Blue-500
    border: 'border-[#1d4ed8]', // Blue-700
    text: 'text-white',
  },
  orange: {
    bg: 'bg-[#f97316]', // Orange-500
    border: 'border-[#c2410c]', // Orange-700
    text: 'text-black',
  },
  locked: {
    bg: 'bg-[#1e293b]', // Slate-800
    border: 'border-[#0f172a]', // Slate-900
    text: 'text-slate-500',
  }
};

export function LessonNode({ lesson, colorTheme }: LessonNodeProps) {
  const isLocked = lesson.status === 'locked';
  const theme = isLocked ? themes.locked : themes[colorTheme];

  const NodeContent = (
    <div
      className={clsx(
        // Box Shape
        'relative flex items-center justify-center w-full min-h-[60px] p-2 mb-4 z-20',
        'border-4',
        theme.bg,
        theme.border,
        // Pixel Art "Hard" Shadow
        'shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)]',
        // Click effect
        !isLocked && 'active:translate-y-1 active:shadow-none transition-all duration-75 cursor-pointer'
      )}
    >
      {isLocked && <Lock size={14} className="absolute left-2 text-slate-500" />}
      
      <span className={clsx(
        "text-[10px] uppercase font-bold tracking-widest text-center leading-tight",
        theme.text
      )}>
        {lesson.title}
      </span>
    </div>
  );

  return isLocked ? (
    <div className="w-48">{NodeContent}</div>
  ) : (
    <Link to={`/lessons/${lesson.id}`} className="w-48 focus:outline-none block">
      {NodeContent}
    </Link>
  );
}