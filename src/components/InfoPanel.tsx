import { Lock } from 'lucide-react';
import type { Lesson } from '../types';

interface InfoPanelProps {
  lesson: Lesson | null;
}

export function InfoPanel({ lesson }: InfoPanelProps) {
  return (
    // FIX 1: Positioned on the TOP RIGHT corner of the page
    <div 
      style={{
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        width: '24rem',
        padding: '1.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(10px)',
        borderRadius: '0.75rem',
        border: '2px solid #334155',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        zIndex: 100,
        fontFamily: 'sans-serif',
        // FIX 2: Makes the panel FADE OUT and become unclickable when not hovered
        opacity: lesson ? 1 : 0,
        pointerEvents: lesson ? 'auto' : 'none',
        transition: 'opacity 0.2s ease-in-out',
      }}
    >
      {/* 
        This is the new logic:
        - If a lesson is hovered, show its details.
        - If not, this content will be invisible because the whole panel has opacity: 0.
      */}
      {lesson ? (
        <div>
          {lesson.status === 'locked' && (
            <div 
              className="mb-4 p-3 rounded-lg flex items-center gap-3"
              style={{ backgroundColor: '#7f1d1d', border: '1px solid #dc2626' }}
            >
              <Lock size={20} className="text-white flex-shrink-0" />
              <p className="text-white text-xs font-normal normal-case leading-snug">
                To unlock this chest, please complete the previous mission in this path.
              </p>
            </div>
          )}

          <h3 className="text-xl font-bold uppercase tracking-wider mb-2" style={{ color: '#facc15' }}>
            {lesson.title}
          </h3>

          <p className="leading-relaxed font-normal normal-case" style={{ color: '#111827' }}>
            {lesson.description}
          </p>
        </div>
      ) : (
        // This content is now effectively invisible and unclickable.
        // It's just a fallback for React.
        <div></div>
      )}
    </div>
  );
}