import React from 'react';
import type { Quest } from '../hooks/useQuestSystem';

interface QuestPanelProps {
  quests: Quest[];
  allCompleted: boolean;
  onQuestSelect?: (questId: string) => void;
}

export const QuestPanel: React.FC<QuestPanelProps> = ({ quests, allCompleted, onQuestSelect }) => {
  return (
    <div className="w-full bg-[var(--bg-sidebar)] border-4 border-[var(--border-color)] p-8 relative">
      {/* Header */}
      <div className="absolute -top-3 -left-3 bg-[var(--bg-main)] border-2 border-[var(--border-color)] p-1 text-[var(--accent)]">
        🗺️
      </div>

      <div className="mb-8">
        <h2 className="text-xs font-pixel text-[var(--text-main)] mb-2 uppercase opacity-70 tracking-widest">
          // DAILY MISSIONS
        </h2>
        <p className="text-[11px] font-mono text-[var(--text-muted)]">
          {allCompleted ? '✓ ALL_QUESTS_COMPLETED' : `${quests.filter(q => q.completed).length}/${quests.length} ACTIVE`}
        </p>
      </div>

      {/* Quest Grid */}
      <div className="space-y-4">
        {quests.map((quest) => (
          <div
            key={quest.id}
            onClick={() => onQuestSelect?.(quest.id)}
            className={`p-4 border-2 transition-all cursor-pointer group ${
              quest.completed
                ? 'bg-[var(--accent)]/10 border-[var(--accent)] shadow-[0_0_15px_rgba(var(--accent-rgb),0.15)]'
                : 'bg-black/20 border-[var(--border-color)] hover:border-[var(--accent)]/50'
            }`}
          >
            {/* Quest Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{quest.icon}</span>
                <div>
                  <h3 className="font-mono text-[11px] text-[var(--text-main)] uppercase font-bold">
                    {quest.title}
                  </h3>
                  <p className="text-[9px] text-[var(--text-muted)] mt-1">
                    {quest.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-[12px] font-bold ${
                  quest.completed ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
                }`}>
                  +{quest.reward} XP
                </div>
                {quest.completed && (
                  <div className="text-[10px] text-[var(--accent)] font-pixel mt-1">✓ DONE</div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-black/40 border border-[var(--border-color)] h-4 relative overflow-hidden">
              <div
                className={`h-full transition-all duration-300 flex items-center justify-center ${
                  quest.completed
                    ? 'bg-[var(--accent)]'
                    : 'bg-[var(--accent)]/50'
                }`}
                style={{
                  width: `${Math.min(100, (quest.progress / quest.target) * 100)}%`
                }}
              >
                {/* Scanline effect */}
                <div className="absolute inset-0 bg-white/10" />
              </div>
              {/* Progress text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[9px] font-bold text-white drop-shadow-lg">
                  {quest.progress}/{quest.target}
                </span>
              </div>
            </div>

            {/* Difficulty badge */}
            <div className="mt-2 flex justify-between items-center">
              <div className="text-[8px] font-pixel text-[var(--text-muted)] uppercase opacity-70">
                {quest.difficulty}
              </div>
              {quest.completed && (
                <div className="text-[10px] text-[var(--accent)] font-pixel">
                  ★★★
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* All Completed Bonus */}
      {allCompleted && (
        <div className="mt-6 p-4 bg-yellow-900/20 border-2 border-yellow-600/40 rounded">
          <div className="flex items-center gap-3">
            <span className="text-xl">🎁</span>
            <div>
              <p className="text-[11px] font-pixel text-yellow-400 uppercase font-bold">
                daily bonus unlocked
              </p>
              <p className="text-[9px] text-yellow-300/70 mt-1">
                Complete all quests to earn +50 XP bonus!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Reset Info */}
      <div className="mt-4 text-[8px] text-[var(--text-muted)] font-mono opacity-60">
        // Quests reset daily at midnight
      </div>
    </div>
  );
};
