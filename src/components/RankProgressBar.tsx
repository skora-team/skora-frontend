import React from 'react';
import type { RankInfo } from '../hooks/useRankSystem';

interface RankProgressBarProps {
  rankInfo: RankInfo | null;
}

export const RankProgressBar: React.FC<RankProgressBarProps> = ({ rankInfo }) => {
  if (!rankInfo) return null;

  const isMaxRank = rankInfo.rankId === 'legend';

  return (
    <div className="bg-gradient-to-r from-[var(--bg-sidebar)] to-[var(--bg-main)] border-2 border-[var(--accent)] rounded-lg p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-5xl animate-pulse">{rankInfo.icon}</div>
          <div>
            <p className="font-pixel text-xs text-[var(--text-muted)] uppercase tracking-tight">
              RANK {rankInfo.level}
            </p>
            <p className="text-2xl font-bold text-[var(--accent)]">{rankInfo.rankName}</p>
            <p className="text-xs text-[var(--text-muted)] italic">{rankInfo.description}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-[var(--text-main)]">
            {rankInfo.lessonsCompleted}
          </p>
          <p className="text-xs text-[var(--text-muted)] font-pixel">
            LESSONS COMPLETED
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      {!isMaxRank ? (
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-pixel text-[var(--text-muted)]">
            <span>PROGRESS TO {rankInfo.rankName.toUpperCase()}</span>
            <span>{rankInfo.progressToNextRank}%</span>
          </div>
          <div className="w-full h-3 bg-[var(--bg-main)] rounded border-2 border-[var(--border-color)] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--accent)] to-green-500 transition-all duration-500 relative"
              style={{ width: `${rankInfo.progressToNextRank}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
          <p className="text-xs text-[var(--text-muted)] text-center">
            {rankInfo.lessonsForNextRank - rankInfo.lessonsCompleted} lessons until next rank
          </p>
        </div>
      ) : (
        <div className="text-center bg-yellow-500/20 border border-yellow-500 rounded p-4">
          <p className="font-pixel text-sm text-yellow-600 uppercase font-bold">
            🏆 Maximum Rank Achieved! You are a Legend! 🏆
          </p>
        </div>
      )}

      {/* Unlocked Cosmetics Preview */}
      {rankInfo.unlockedCosmetics.length > 0 && (
        <div className="pt-4 border-t border-[var(--border-color)]">
          <p className="text-xs font-pixel text-[var(--text-muted)] uppercase mb-2">
            Unlocked at this rank:
          </p>
          <div className="flex flex-wrap gap-2">
            {rankInfo.unlockedCosmetics.slice(-2).map(cosmetic => (
              <div
                key={cosmetic}
                className="px-3 py-1 bg-[var(--accent)]/20 border border-[var(--accent)] rounded text-xs text-[var(--accent)] font-pixel"
              >
                ✨ {cosmetic.replace('_', ' ').toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
