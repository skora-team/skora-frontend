import React from 'react';
import { Flame, Zap } from 'lucide-react';

interface GameHUDProps {
  streak: number;
  totalXP: number;
  multiplier: number;
  currentQuestion: number;
  totalQuestions: number;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  streak,
  totalXP,
  multiplier,
  currentQuestion,
  totalQuestions,
}) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="space-y-4 mb-8">
      {/* Top stats bar */}
      <div className="grid grid-cols-3 gap-4 bg-gradient-to-r from-[var(--bg-sidebar)] to-[var(--bg-main)] p-4 rounded border border-[var(--accent)]/20">
        {/* Streak */}
        <div className="flex items-center gap-2">
          <Flame size={20} className={streak > 0 ? 'text-orange-500' : 'text-gray-500'} />
          <div>
            <p className="text-xs text-[var(--text-muted)] font-pixel">STREAK</p>
            <p className="text-lg font-bold text-[var(--text-main)]">{streak}</p>
          </div>
        </div>

        {/* XP */}
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-yellow-500" />
          <div>
            <p className="text-xs text-[var(--text-muted)] font-pixel">TOTAL XP</p>
            <p className="text-lg font-bold text-[var(--text-main)]">{totalXP}</p>
          </div>
        </div>

        {/* Multiplier */}
        <div className={`flex items-center justify-center rounded p-2 ${
          multiplier > 1 ? 'bg-green-500/20 border border-green-500/50' : 'bg-gray-500/10 border border-gray-500/20'
        }`}>
          <div className="text-center">
            <p className="text-xs text-[var(--text-muted)] font-pixel">MULTIPLIER</p>
            <p className={`text-lg font-bold ${multiplier > 1 ? 'text-green-500' : 'text-gray-500'}`}>
              {multiplier.toFixed(2)}x
            </p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-pixel text-[var(--text-muted)]">
          <span>QUESTION {currentQuestion} / {totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-[var(--bg-sidebar)] rounded border border-[var(--border-color)]">
          <div
            className="h-full bg-gradient-to-r from-[var(--accent)] to-green-500 rounded transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
