// src/components/LessonNode.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Lesson } from '../types';
import clsx from 'clsx';

interface LessonNodeProps {
  lesson: Lesson;
  colorTheme: 'yellow' | 'blue' | 'orange';
  onHover: (lesson: Lesson) => void; 
  onHoverEnd: () => void;
}

export function LessonNode({ lesson, onHover, onHoverEnd }: LessonNodeProps) {
  const navigate = useNavigate();
  const [isShaking, setIsShaking] = useState(false);
  const status = lesson.status; 

  const handleClick = () => {
    if (status === 'locked') return;
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      navigate(`/lessons/${lesson.id}`);
    }, 500);
  };

  return (
    <div 
      className="flex flex-col items-center relative z-10 w-full group"
      onMouseEnter={() => onHover(lesson)}
      onMouseLeave={onHoverEnd}
    >
      
      <div 
        onClick={handleClick}
        style={{ width: '80px', height: '80px' }} 
        className={clsx(
          "relative transition-all duration-200",
          isShaking ? "animate-shake" : "",
          status === 'unlocked' && !isShaking ? "animate-bounce-pixel cursor-pointer hover:scale-110 drop-shadow-xl" : "",
          status === 'completed' ? "cursor-default" : "",
          status === 'locked' ? "opacity-60 grayscale contrast-125 cursor-not-allowed" : ""
        )}
      >
        <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-lg" shapeRendering="crispEdges">
          {/* ... SVG for chest ... */}
          <path d="M4 10 h24 v18 h-24 z" fill="#09090b" /> 
          <path d="M4 10 h24 v-4 h-24 z" fill="#09090b" />
          <rect x="6" y="10" width="20" height="16" fill="#be123c" />
          <rect x="6" y="20" width="20" height="2" fill="#881337" />
          <path d="M6 6 h20 v5 h-20 z" fill="#be123c" /> 
          <rect x="6" y="8" width="20" height="1" fill="#fb7185" />
          <rect x="6" y="6" width="4" height="22" fill="#475569" />
          <rect x="6" y="6" width="1" height="22" fill="#94a3b8" />
          <rect x="9" y="6" width="1" height="22" fill="#1e293b" />
          <rect x="22" y="6" width="4" height="22" fill="#475569" />
          <rect x="22" y="6" width="1" height="22" fill="#94a3b8" />
          <rect x="25" y="6" width="1" height="22" fill="#1e293b" />
          <rect x="4" y="11" width="24" height="3" fill="#1e293b" />
          <rect x="4" y="11" width="24" height="2" fill="#475569" />
          {status === 'completed' ? (
             <circle cx="16" cy="12" r="4" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
          ) : (
             <>
               <path d="M13 10 h6 v8 l-3 3 l-3 -3 z" fill="#fbbf24" />
               <rect x="14" y="11" width="4" height="4" fill="#fcd34d" />
               <rect x="15" y="15" width="2" height="3" fill="#000" />
             </>
          )}
          <rect x="4" y="26" width="4" height="2" fill="#09090b" />
          <rect x="24" y="26" width="4" height="2" fill="#09090b" />
        </svg>
      </div>

      {/* TEXT LABEL: Dark text for light background */}
      <div className={clsx(
        "mt-3 text-xs font-bold text-center leading-tight select-none max-w-[200px] break-words font-sans tracking-wide",
        status === 'locked' 
          ? "text-slate-400" 
          : "text-slate-800 drop-shadow-sm" 
      )}>
        {lesson.title}
      </div>
    </div>
  );
}