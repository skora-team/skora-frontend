import type { BattleEnemyConfig } from '../components/BattleUI';

const ENEMY_POOL: Record<string, { name: string; emoji: string }[]> = {
  recruit: [
    { name: 'Slime', emoji: '🟢' },
    { name: 'Goblin', emoji: '👹' },
    { name: 'Skeleton', emoji: '💀' },
    { name: 'Ghost', emoji: '👻' }
  ],
  apprentice: [
    { name: 'Spider', emoji: '🕷️' },
    { name: 'Wolf', emoji: '🐺' },
    { name: 'Troll', emoji: '👹' },
    { name: 'Imp', emoji: '😈' }
  ],
  warrior: [
    { name: 'Dragon', emoji: '🐉' },
    { name: 'Knight', emoji: '🛡️' },
    { name: 'Demon', emoji: '👹' },
    { name: 'Golem', emoji: '🗿' }
  ],
  champion: [
    { name: 'Sorcerer', emoji: '🧙' },
    { name: 'Phoenix', emoji: '🔥' },
    { name: 'Hydra', emoji: '🐍' },
    { name: 'Lich', emoji: '💀' }
  ],
  legend: [
    { name: 'Ancient One', emoji: '👑' },
    { name: 'Void Entity', emoji: '🌌' },
    { name: 'Cosmic Horror', emoji: '🌀' },
    { name: 'Time Keeper', emoji: '⏰' }
  ]
};

export function generateRandomEnemy(difficulty: 'recruit' | 'apprentice' | 'warrior' | 'champion' | 'legend'): BattleEnemyConfig {
  const pool = ENEMY_POOL[difficulty];
  const randomEnemy = pool[Math.floor(Math.random() * pool.length)];

  return {
    name: randomEnemy.name,
    emoji: randomEnemy.emoji,
    difficulty,
    maxHealth: 10 * [1, 1.5, 2, 2.5, 3][['recruit', 'apprentice', 'warrior', 'champion', 'legend'].indexOf(difficulty)]
  };
}

export function getDifficultyFromRank(rank: number): 'recruit' | 'apprentice' | 'warrior' | 'champion' | 'legend' {
  const difficulties: ('recruit' | 'apprentice' | 'warrior' | 'champion' | 'legend')[] = [
    'recruit',
    'apprentice',
    'warrior',
    'champion',
    'legend'
  ];
  return difficulties[Math.min(rank, 4)];
}
