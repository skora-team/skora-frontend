import React, { useEffect, useState } from 'react';

interface AchievementToastProps {
  achievementName: string;
  achievementIcon: string;
  isVisible: boolean;
  onClose?: () => void;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({
  achievementName,
  achievementIcon,
  isVisible,
  onClose,
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
        setTimeout(() => onClose?.(), 300);
      }, 2700);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-8 right-8 pointer-events-none z-[9999] transition-all duration-300 ${
        animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 border-2 border-yellow-300 rounded-lg p-4 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="text-5xl animate-bounce">{achievementIcon}</div>

          {/* Content */}
          <div className="flex flex-col gap-1">
            <p className="font-pixel text-xs text-yellow-900 uppercase tracking-tight">
              Achievement Unlocked!
            </p>
            <p className="font-bold text-yellow-950 text-sm">{achievementName}</p>
          </div>

          {/* Sparkle effect */}
          <div className="absolute -top-2 -right-2 text-2xl animate-spin">✨</div>
          <div className="absolute -bottom-1 -left-1 text-xl">⚡</div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 w-full h-1 bg-yellow-300/30 rounded overflow-hidden">
          <div
            className="h-full bg-yellow-900"
            style={{
              animation: `shrink 3s linear forwards`,
              width: '100%',
            }}
          />
          <style>{`
            @keyframes shrink {
              from { width: 100%; }
              to { width: 0%; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};
