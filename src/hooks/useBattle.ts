import { useState, useCallback } from 'react';

export interface BattleConfig {
  difficultyTier: 'recruit' | 'apprentice' | 'warrior' | 'champion' | 'legend';
  totalQuestions: number;
}

export function useBattle(config: BattleConfig) {
  // Max health scales with difficulty
  const difficultyMultiplier: Record<string, number> = {
    recruit: 1,
    apprentice: 1.5,
    warrior: 2,
    champion: 2.5,
    legend: 3
  };

  const maxHealth = 10 * difficultyMultiplier[config.difficultyTier];

  const [battleState, setBattleState] = useState({
    enemyHealth: maxHealth,
    playerStreak: 0,
    questionsRemaining: config.totalQuestions,
    totalQuestions: config.totalQuestions,
    isDefeated: false,
    isVictory: false,
    correctAnswers: 0,
    wrongAnswers: 0
  });

  // Handle correct answer
  const recordCorrectAnswer = useCallback(() => {
    setBattleState(prev => {
      if (prev.isDefeated || prev.isVictory) return prev;

      const newQuestionsRemaining = prev.questionsRemaining - 1;
      const newStreak = prev.playerStreak + 1;
      
      // Damage scales with streak (more consecutive correct = more damage)
      const streakDamageBonus = Math.floor(newStreak / 2) * 0.5;
      const damage = 1 + streakDamageBonus;
      
      const newHealth = prev.enemyHealth - damage;
      const isVictory = newHealth <= 0;

      return {
        ...prev,
        enemyHealth: Math.max(0, newHealth),
        playerStreak: newStreak,
        questionsRemaining: newQuestionsRemaining,
        isVictory: isVictory,
        correctAnswers: prev.correctAnswers + 1
      };
    });
  }, []);

  // Handle wrong answer
  const recordWrongAnswer = useCallback(() => {
    setBattleState(prev => {
      if (prev.isDefeated || prev.isVictory) return prev;

      const newQuestionsRemaining = prev.questionsRemaining - 1;

      // 3 strikes and you're out
      const isDefeated = prev.wrongAnswers + 1 >= 3;

      return {
        ...prev,
        // Wrong answers should cost attempts, not damage the enemy.
        enemyHealth: prev.enemyHealth,
        playerStreak: 0, // Streak breaks on wrong answer
        questionsRemaining: newQuestionsRemaining,
        isDefeated,
        wrongAnswers: prev.wrongAnswers + 1
      };
    });
  }, []);

  // Get battle results
  const getBattleResults = useCallback(() => {
    const accuracy = battleState.totalQuestions > 0
      ? Math.round((battleState.correctAnswers / battleState.totalQuestions) * 100)
      : 0;

    return {
      won: battleState.isVictory,
      lost: battleState.isDefeated,
      correctAnswers: battleState.correctAnswers,
      wrongAnswers: battleState.wrongAnswers,
      accuracy,
      maxStreak: battleState.playerStreak,
      xpBonus: battleState.isVictory ? 100 : 0 // Bonus XP for victory
    };
  }, [battleState]);

  // Reset battle
  const resetBattle = useCallback(() => {
    setBattleState({
      enemyHealth: maxHealth,
      playerStreak: 0,
      questionsRemaining: config.totalQuestions,
      totalQuestions: config.totalQuestions,
      isDefeated: false,
      isVictory: false,
      correctAnswers: 0,
      wrongAnswers: 0
    });
  }, [config.totalQuestions, maxHealth]);

  return {
    battleState,
    recordCorrectAnswer,
    recordWrongAnswer,
    getBattleResults,
    resetBattle
  };
}
