import React from 'react';
import { Zap, Trophy, TrendingUp } from 'lucide-react';

interface QuizResultsCardProps {
  score: number;
  totalQuestions: number;
  totalXP: number;
  streak: number;
  correctCount: number;
}

export const QuizResultsCard: React.FC<QuizResultsCardProps> = ({
  score,
  totalQuestions,
  totalXP,
  streak,
  correctCount,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPerfect = score === totalQuestions;
  const isGood = score >= totalQuestions * 0.7;

  return (
    <div className="bg-gradient-to-br from-[var(--bg-sidebar)] to-[var(--bg-main)] border-2 border-[var(--accent)] rounded-lg p-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          {isPerfect && <Trophy size={48} className="text-yellow-400 animate-bounce" />}
          {isGood && !isPerfect && <TrendingUp size={48} className="text-green-500" />}
          {!isGood && <Zap size={48} className="text-orange-500" />}
        </div>
        <h2 className="text-3xl font-bold font-pixel text-[var(--text-main)]">
          {isPerfect ? 'FLAWLESS!' : isGood ? 'GREAT JOB!' : 'KEEP LEARNING!'}
        </h2>
      </div>

      {/* Score Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Accuracy */}
        <div className="bg-[var(--bg-main)]/50 border border-[var(--border-color)] rounded p-4 text-center">
          <p className="text-xs text-[var(--text-muted)] font-pixel mb-2">ACCURACY</p>
          <p className="text-2xl font-bold text-[var(--accent)]">{percentage}%</p>
          <p className="text-xs text-[var(--text-muted)]">{score}/{totalQuestions}</p>
        </div>

        {/* XP Earned */}
        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded p-4 text-center">
          <p className="text-xs text-yellow-600 font-pixel mb-2">TOTAL XP</p>
          <p className="text-2xl font-bold text-yellow-500">{totalXP}</p>
          <p className="text-xs text-yellow-600">+{totalXP} earned</p>
        </div>

        {/* Correct Streak */}
        <div className="bg-orange-500/10 border border-orange-500/50 rounded p-4 text-center">
          <p className="text-xs text-orange-600 font-pixel mb-2">BEST STREAK</p>
          <p className="text-2xl font-bold text-orange-500">{streak}</p>
          <p className="text-xs text-orange-600">in a row</p>
        </div>

        {/* Questions Correct */}
        <div className="bg-green-500/10 border border-green-500/50 rounded p-4 text-center">
          <p className="text-xs text-green-600 font-pixel mb-2">CORRECT</p>
          <p className="text-2xl font-bold text-green-500">{correctCount}</p>
          <p className="text-xs text-green-600">questions nailed</p>
        </div>
      </div>

      {/* Achievement Badge */}
      {isPerfect && (
        <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded-lg p-4 text-center">
          <p className="text-sm font-pixel text-yellow-600 font-bold">
            🏆 PERFECT SCORE - ACHIEVEMENT UNLOCKED!
          </p>
        </div>
      )}

      {isGood && !isPerfect && (
        <div className="bg-green-500/20 border-2 border-green-500 rounded-lg p-4 text-center">
          <p className="text-sm font-pixel text-green-600 font-bold">
            ✓ Great performance! Keep your streak going!
          </p>
        </div>
      )}
    </div>
  );
};
