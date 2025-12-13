// src/components/InspectorPanel.tsx
import { Lock } from 'lucide-react';
import type { Lesson } from '../types';

interface InspectorPanelProps {
  lesson: Lesson | null; // It accepts the whole lesson object or null
}

export function InspectorPanel({ lesson }: InspectorPanelProps) {
  return (
    // This panel is always visible, fixed to the right side
    <div 
      className="fixed top-1/2 -translate-y-1/2 right-0 mr-8 w-96 p-6 
                 bg-slate-800/80 text-white
                 rounded-xl shadow-2xl border-2 border-yellow-500/30 backdrop-blur-md
                 font-sans text-sm
                 transition-all duration-300"
      style={{ zIndex: 100 }}
    >
      {/* 
        This is the new logic:
        - If a lesson is hovered, show its details.
        - If not, show a placeholder message.
      */}
      {lesson ? (
        // --- VIEW WHEN A CHEST IS HOVERED ---
        <div>
          {lesson.status === 'locked' && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg flex items-center gap-3">
              <Lock size={20} className="text-red-300 flex-shrink-0" />
              <p className="text-red-200 text-xs font-normal normal-case leading-snug">
                To unlock this chest, please complete the previous mission in this path.
              </p>
            </div>
          )}

          <h3 className="text-xl font-bold text-yellow-400 mb-2 uppercase tracking-wider">
            {lesson.title}
          </h3>

          <p className="text-gray-300 leading-relaxed font-normal normal-case">
            {lesson.description}
          </p>
        </div>
      ) : (
        // --- DEFAULT VIEW WHEN NOTHING IS HOVERED ---
        <div className="text-center text-slate-400">
          <p className="font-bold text-lg mb-2">Skill Inspector</p>
          <p className="text-sm">Hover over a chest to see its details.</p>
        </div>
      )}
    </div>
  );
}