import React, { useState, useEffect } from 'react';
import { getRandomQuote } from '../utils/narrativeContent';

interface NarrativeBannerProps {
  variant?: 'quote' | 'welcome' | 'rank' | 'achievement';
  title?: string;
  message?: string;
  icon?: string;
}

export const NarrativeBanner: React.FC<NarrativeBannerProps> = ({
  variant = 'quote',
  title,
  message,
  icon = '📜'
}) => {
  const [displayMessage, setDisplayMessage] = useState(message || '');

  useEffect(() => {
    if (!message && variant === 'quote') {
      setDisplayMessage(getRandomQuote());
    }
  }, [message, variant]);

  const isQuote = variant === 'quote';

  return (
    <div className={`border-2 p-6 rounded-lg ${
      isQuote
        ? 'border-amber-600/40 bg-amber-900/10'
        : 'border-[var(--border-color)] bg-[var(--bg-sidebar)]/50'
    }`}>
      <div className="flex gap-4">
        <div className="text-3xl flex-shrink-0 mt-1">{icon}</div>
        <div className="flex-1">
          {title && (
            <h3 className={`font-pixel text-sm uppercase mb-2 ${
              isQuote
                ? 'text-amber-400'
                : 'text-[var(--accent)]'
            }`}>
              {title}
            </h3>
          )}
          <p className={`font-mono text-sm leading-relaxed ${
            isQuote
              ? 'text-amber-300/80 italic'
              : 'text-[var(--text-main)]'
          }`}>
            {displayMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

// Inline narrative hint - lighter version for tips during gameplay
export const NarrativeHint: React.FC<{ children: string }> = ({ children }) => {
  return (
    <div className="text-xs font-mono text-[var(--text-muted)] italic mt-2 pl-3 border-l-2 border-[var(--accent)]/30">
      {children}
    </div>
  );
};

// Achievement story popup
interface AchievementStoryProps {
  title: string;
  narrative: string;
  rarity: string;
  isShown: boolean;
}

export const AchievementStory: React.FC<AchievementStoryProps> = ({
  title,
  narrative,
  rarity,
  isShown
}) => {
  if (!isShown) return null;

  const rarityColors: Record<string, string> = {
    Common: 'text-gray-400',
    Rare: 'text-blue-400',
    Epic: 'text-purple-400',
    Legendary: 'text-yellow-400'
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-40 pointer-events-none">
      <div className="bg-[var(--bg-main)] border-4 border-[var(--accent)] p-8 max-w-md text-center mx-4">
        <p className={`text-xs font-pixel mb-2 uppercase ${rarityColors[rarity] || 'text-gray-400'}`}>
          {rarity}
        </p>
        <h3 className="text-2xl font-pixel text-[var(--accent)] mb-4 uppercase">
          {title}
        </h3>
        <p className="font-mono text-sm text-[var(--text-muted)] mb-6 italic leading-relaxed">
          "{narrative}"
        </p>
        <div className="text-lg">✨</div>
      </div>
    </div>
  );
};
