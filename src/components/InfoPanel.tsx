import { Lock } from 'lucide-react';
import type { Lesson } from '../types';

interface InfoPanelProps {
  lesson: Lesson | null; // It now accepts the whole lesson object or null
}

export function InfoPanel({ lesson }: InfoPanelProps) {
  // If no lesson is hovered, don't show anything
  if (!lesson) {
    return null;
  }

  return (
    // FIXED: Positioned on the right side of the page
    <div 
      className="fixed top-1/2 -translate-y-1/2 right-0 mr-8 w-96 p-6 
                 bg-slate-800/90 text-white
                 rounded-xl shadow-2xl border-2 border-yellow-500/50 backdrop-blur-md
                 font-sans text-sm
                 transition-opacity duration-300"
      style={{ zIndex: 100 }}
    >
      {/* FIXED: Title is now yellow */}
      <h3 className="text-xl font-bold text-yellow-400 mb-4 uppercase tracking-wider">
        {lesson.title}
      </h3>
      
      {/* --- CONDITIONAL INFO FOR LOCKED CHESTS --- */}
      {lesson.status === 'locked' && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg flex items-center gap-3">
          <Lock size={20} className="text-red-300 flex-shrink-0" />
          <p className="text-red-200 text-xs font-normal normal-case leading-snug">
            To unlock this chest, please complete the previous mission in this path.
          </p>
        </div>
      )}

      {/* The standard description, which is always visible */}
      <p className="text-gray-300 leading-relaxed font-normal normal-case">
        {lesson.description}
      </p>
    </div>
  );
}