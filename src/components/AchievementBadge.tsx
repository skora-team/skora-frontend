import React from 'react';

interface AchievementBadgeProps {
  icon: string;
  name: string;
  description: string;
  unlocked: boolean;
  newlyUnlocked?: boolean;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  icon,
  name,
  description,
  unlocked,
  newlyUnlocked,
}) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center w-20 h-20 rounded-lg border-2 transition-all ${
        unlocked
          ? newlyUnlocked
            ? 'bg-yellow-400/20 border-yellow-400 scale-110 animate-bounce'
            : 'bg-green-500/10 border-green-500'
          : 'bg-gray-500/5 border-gray-500/20'
      }`}
      title={description}
    >
      <div className={`text-3xl ${unlocked ? '' : 'opacity-30'}`}>{icon}</div>
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 opacity-0 hover:opacity-100 transition-opacity">
        <div className="bg-[var(--bg-sidebar)] border border-[var(--border-color)] rounded px-2 py-1 text-xs font-pixel text-center whitespace-normal">
          {name}
        </div>
      </div>
      {unlocked && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">✓</span>
        </div>
      )}
    </div>
  );
};
