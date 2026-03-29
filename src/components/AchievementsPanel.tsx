import React from 'react';
import type { Achievement } from '../hooks/useAchievements';
import { AchievementBadge } from './AchievementBadge';

interface AchievementsPanelProps {
  achievements: Achievement[];
  newlyUnlockedIds?: string[];
}

export const AchievementsPanel: React.FC<AchievementsPanelProps> = ({
  achievements,
  newlyUnlockedIds = [],
}) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="bg-gradient-to-br from-[var(--bg-sidebar)] to-[var(--bg-main)] border-2 border-[var(--accent)] rounded-lg p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold font-pixel text-[var(--text-main)]">
          ACHIEVEMENTS
        </h3>
        <div className="bg-[var(--accent)]/20 border border-[var(--accent)] rounded px-3 py-1">
          <p className="text-sm font-pixel text-[var(--accent)]">
            {unlockedCount}/{totalCount}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-[var(--bg-main)] rounded border border-[var(--border-color)]">
        <div
          className="h-full bg-gradient-to-r from-[var(--accent)] to-green-500 rounded transition-all duration-500"
          style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
        />
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-5 gap-6 mt-6">
        {achievements.map(achievement => (
          <div key={achievement.id} className="flex justify-center">
            <AchievementBadge
              icon={achievement.icon}
              name={achievement.name}
              description={achievement.description}
              unlocked={achievement.unlocked}
              newlyUnlocked={newlyUnlockedIds.includes(achievement.id)}
            />
          </div>
        ))}
      </div>

      {/* List of descriptions */}
      <div className="mt-8 pt-4 border-t border-[var(--border-color)] space-y-3">
        {achievements.map(achievement => (
          <div
            key={achievement.id}
            className={`flex items-center gap-3 p-3 rounded transition-all ${
              achievement.unlocked
                ? 'bg-green-500/10 border border-green-500/50'
                : 'bg-gray-500/5 border border-gray-500/20'
            }`}
          >
            <div className="text-2xl">{achievement.icon}</div>
            <div className="flex-1">
              <p
                className={`font-pixel text-sm font-bold ${
                  achievement.unlocked
                    ? 'text-green-500'
                    : 'text-[var(--text-muted)]'
                }`}
              >
                {achievement.name}
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                {achievement.description}
              </p>
            </div>
            {achievement.unlocked && (
              <div className="text-green-500 text-lg font-bold">✓</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
