import React, { useState, useEffect } from 'react';

export interface BattleEnemyConfig {
  name: string;
  emoji: string;
  difficulty: 'recruit' | 'apprentice' | 'warrior' | 'champion' | 'legend';
  maxHealth: number;
}

export interface BattleState {
  enemyHealth: number;
  playerStreak: number;
  questionsRemaining: number;
  totalQuestions: number;
  isDefeated: boolean;
  isVictory: boolean;
}

interface BattleUIProps {
  enemy: BattleEnemyConfig;
  state: BattleState;
  onAnswer?: (correct: boolean) => void;
  children?: React.ReactNode; // Quiz content goes here
}

const DIFFICULTY_COLORS: Record<string, { text: string; glow: string }> = {
  recruit: { text: 'text-gray-400', glow: 'shadow-[0_0_20px_rgba(100,100,100,0.4)]' },
  apprentice: { text: 'text-green-400', glow: 'shadow-[0_0_20px_rgba(34,197,94,0.4)]' },
  warrior: { text: 'text-blue-400', glow: 'shadow-[0_0_20px_rgba(96,165,250,0.4)]' },
  champion: { text: 'text-purple-400', glow: 'shadow-[0_0_20px_rgba(168,85,247,0.4)]' },
  legend: { text: 'text-yellow-400', glow: 'shadow-[0_0_20px_rgba(250,204,21,0.4)]' }
};

const DIFFICULTY_NAMES: Record<string, string> = {
  recruit: 'Grunt',
  apprentice: 'Minion',
  warrior: 'Champion',
  champion: 'Warlord',
  legend: 'Ancient One'
};

export const BattleUI: React.FC<BattleUIProps> = ({ enemy, state, children }) => {
  const [healthPercent, setHealthPercent] = useState(100);
  const [shakeEnabled, setShakeEnabled] = useState(false);

  useEffect(() => {
    const newPercent = (state.enemyHealth / enemy.maxHealth) * 100;
    setHealthPercent(newPercent);
    
    // Trigger shake on damage
    if (state.enemyHealth < enemy.maxHealth) {
      setShakeEnabled(true);
      setTimeout(() => setShakeEnabled(false), 300);
    }
  }, [state.enemyHealth, enemy.maxHealth]);

  const colors = DIFFICULTY_COLORS[enemy.difficulty];

  return (
    <div className="relative w-full">
      {/* BATTLE ARENA BACKGROUND */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
      </div>

      {/* ENEMY SECTION */}
      <div className={`mb-12 relative ${shakeEnabled ? 'animate-pulse' : ''}`}>
        <div className={`border-4 border-[var(--border-color)] bg-black/60 p-8 ${colors.glow} transition-all`}>
          {/* Enemy Name & Difficulty */}
          <div className="text-center mb-6">
            <div className={`text-6xl mb-4 animate-bounce`}>{enemy.emoji}</div>
            <h2 className={`text-3xl font-pixel font-bold uppercase ${colors.text}`}>
              {DIFFICULTY_NAMES[enemy.difficulty]}
            </h2>
            <p className="text-xs font-mono text-[var(--text-muted)] uppercase mt-2">
              {enemy.name}
            </p>
            <div className={`inline-block mt-2 px-3 py-1 border border-[var(--border-color)] text-[10px] font-pixel ${colors.text}`}>
              {enemy.difficulty.toUpperCase()}
            </div>
          </div>

          {/* HEALTH BAR */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase">Enemy Health</span>
              <span className="text-[11px] font-bold text-red-400">
                {Math.max(0, state.enemyHealth)}/{enemy.maxHealth} HP
              </span>
            </div>
            <div className="w-full h-6 border-3 border-red-900 bg-black/50 relative overflow-hidden">
              <div
                className={`h-full transition-all duration-500 origin-left ${
                  healthPercent > 50 ? 'bg-red-600' : 'bg-red-700'
                }`}
                style={{ width: `${Math.max(0, healthPercent)}%` }}
              >
                {/* Energy effect */}
                <div className="absolute inset-0 bg-red-400/30 animate-pulse"></div>
              </div>
              {/* HP Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-bold text-red-100 drop-shadow-lg text-sm">
                  {Math.max(0, healthPercent).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>

          {/* BATTLE STATUS */}
          <div className="grid grid-cols-3 gap-4 mb-2">
            {/* Streak */}
            <div className="border border-[var(--border-color)] bg-black/30 p-3">
              <p className="text-[9px] font-pixel text-[var(--text-muted)] uppercase mb-1">Streak</p>
              <p className="text-2xl font-bold text-yellow-400">
                {state.playerStreak > 0 ? `${state.playerStreak}🔥` : '--'}
              </p>
            </div>

            {/* Questions */}
            <div className="border border-[var(--border-color)] bg-black/30 p-3">
              <p className="text-[9px] font-pixel text-[var(--text-muted)] uppercase mb-1">Questions</p>
              <p className="text-2xl font-bold text-blue-400">
                {state.questionsRemaining}/{state.totalQuestions}
              </p>
            </div>

            {/* Status */}
            <div className="border border-[var(--border-color)] bg-black/30 p-3">
              <p className="text-[9px] font-pixel text-[var(--text-muted)] uppercase mb-1">Status</p>
              <p className={`text-lg font-bold ${state.isDefeated ? 'text-red-500' : state.isVictory ? 'text-green-500' : 'text-green-400'}`}>
                {state.isDefeated ? 'DEFEAT' : state.isVictory ? 'VICTORY' : 'COMBAT'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* QUIZ CONTENT */}
      <div className="relative z-10">
        {children}
      </div>

      {/* VICTORY SCREEN */}
      {state.isVictory && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-[var(--bg-main)] border-4 border-green-500 p-12 text-center max-w-md shadow-[0_0_50px_rgba(34,197,94,0.3)] animate-bounce">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-pixel text-green-400 uppercase mb-2">Victory!</h3>
            <p className="text-[var(--text-muted)] font-mono text-sm mb-6">
              {enemy.name} has been defeated!
            </p>
            <div className="text-lg font-bold text-yellow-400">
              ⭐ BATTLE COMPLETE ⭐
            </div>
          </div>
        </div>
      )}

      {/* DEFEAT SCREEN */}
      {state.isDefeated && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-[var(--bg-main)] border-4 border-red-500 p-12 text-center max-w-md shadow-[0_0_50px_rgba(239,68,68,0.3)] animate-pulse">
            <div className="text-6xl mb-4">💀</div>
            <h3 className="text-3xl font-pixel text-red-500 uppercase mb-2">Defeated</h3>
            <p className="text-[var(--text-muted)] font-mono text-sm mb-6">
              {enemy.name} was too strong. Try again!
            </p>
            <div className="text-lg font-bold text-red-400">
              ⚠️ MISSION FAILED ⚠️
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
