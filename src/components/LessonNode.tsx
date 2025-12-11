import { Link } from 'react-router-dom';
import type { Lesson } from '../types';
import clsx from 'clsx';
import { Lock } from 'lucide-react';

interface LessonNodeProps {
  lesson: Lesson;
  colorTheme: 'yellow' | 'blue' | 'orange';
}

// These themes apply to ALL states (Locked or Unlocked)
const themes = {
  yellow: {
    bg: 'bg-[#fbbf24]', // Amber-400
    border: 'border-[#b45309]', // Amber-700
    text: 'text-black',
    shadow: 'shadow-[#78350f]',
  },
  blue: {
    bg: 'bg-[#3b82f6]', // Blue-500
    border: 'border-[#1d4ed8]', // Blue-700
    text: 'text-white',
    shadow: 'shadow-[#1e3a8a]',
  },
  orange: {
    bg: 'bg-[#f97316]', // Orange-500
    border: 'border-[#c2410c]', // Orange-700
    text: 'text-black',
    shadow: 'shadow-[#7c2d12]',
  },
};

export function LessonNode({ lesson, colorTheme }: LessonNodeProps) {
  const isLocked = lesson.status === 'locked';
  // Always use the theme color (never gray)
  const theme = themes[colorTheme];

  const NodeContent = (
    <div
      className={clsx(
        // Box Shape
        'relative flex items-center justify-center w-full min-h-[60px] p-2 mb-4 z-20',
        'border-4',
        theme.bg,
        theme.border,
        // Text Color
        theme.text,
        // Pixel Art Shadow
        'shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)]',
        // Interactive states
        !isLocked && 'active:translate-y-1 active:shadow-none transition-all duration-75 cursor-pointer hover:brightness-110',
        // Locked state styling (Dimmed slightly, but still colored)
        isLocked && 'opacity-90 contrast-[0.9]' 
      )}
    >
      {/* Lock Icon */}
      {isLocked && <Lock size={16} className="absolute left-2 opacity-50" />}
      
      <span className="text-[10px] uppercase font-bold tracking-widest text-center leading-tight drop-shadow-sm">
        {lesson.title}
      </span>
    </div>
  );

  // Even if locked, we render the colored box (just not as a link)
  return isLocked ? (
    <div className="w-48 select-none grayscale-[0.2]">{NodeContent}</div>
  ) : (
    <Link to={`/lessons/${lesson.id}`} className="w-48 focus:outline-none block">
      {NodeContent}
    </Link>
  );
}