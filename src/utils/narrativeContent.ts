// Narrative text content for the RPG system
// This provides story flavor and motivation throughout the app

export const narrativeContent = {
  // Rank progression stories
  ranks: {
    recruit: {
      title: 'Recruit',
      description: 'Your journey begins. You are but a novice in the knowledge realm.',
      welcomeMessage: 'Welcome, Recruit. Your legend awaits.',
      strategyHint: 'Focus on mastering the basics. Every expert was once a beginner.'
    },
    apprentice: {
      title: 'Apprentice',
      description: 'You have proven yourself trainable. Your potential shows promise.',
      welcomeMessage: 'Greetings, Apprentice. Your skills are awakening.',
      strategyHint: 'Practice builds mastery. Seek consistent victories.'
    },
    warrior: {
      title: 'Warrior',
      description: 'Battle-tested and hardened. You are no longer a novice.',
      welcomeMessage: 'Hail, Warrior. The realm recognizes your strength.',
      strategyHint: 'True strength comes from facing greater challenges. Seek worthy opponents.'
    },
    champion: {
      title: 'Champion',
      description: 'The legends speak of your deeds. You are among the elite.',
      welcomeMessage: 'Behold, Champion. Your dominance is undeniable.',
      strategyHint: 'Champions inspire others. Lead by example. Mentor the young.'
    },
    legend: {
      title: 'Legend',
      description: 'Your name echoes through the ages. You are immortal in the annals of knowledge.',
      welcomeMessage: 'Hail, Legend. You have transcended mortal limits.',
      strategyHint: 'The world watches you. Every action shapes the future.'
    }
  },

  // Quest narratives
  quests: {
    master_lesson: {
      title: 'Master a Lesson',
      narrative: 'A powerful enemy approaches. Display your mastery by answering 9 out of 10 questions correctly.',
      successMessage: 'Your precision was flawless. The enemy retreats.'
    },
    build_streak: {
      title: 'Fire it Up',
      narrative: 'The embers of your power ignite. Chain 5 perfect answers without faltering.',
      successMessage: 'Flames engulf your foes! Your streak is unstoppable.'
    },
    speed_challenge: {
      title: 'Speed Runner',
      narrative: 'Time is of the essence. Complete a lesson in under 2 minutes.',
      successMessage: 'Swift as lightning. Your enemies never saw it coming.'
    }
  },

  // Battle narratives
  battles: {
    victory: [
      'Your opponent crumbles before your knowledge. Victory is yours.',
      'The enemy falls. You stand triumphant.',
      'A brilliant display of intellect. The battlefield falls silent in awe.',
      'Knowledge is power, and you are the most powerful here.',
      'Your mastery is absolute. The realm trembles at your feet.'
    ],
    defeat: [
      'The enemy overpowers you. But you have learned. Return stronger.',
      'A valuable lesson in humility. Seek revenge with greater preparation.',
      'This battle is lost, but the war continues. Rise again.',
      'Defeat stings, but champions are not defined by one loss.'
    ]
  },

  // Achievement narratives
  achievements: {
    perfect_score: {
      title: 'Perfect Score',
      narrative: 'Flawless execution. Your answers contain no errors. A perfect performance.',
      rarity: 'Rare'
    },
    hot_streak: {
      title: 'Hot Streak',
      narrative: 'Your mind is on fire. A 5-question streak shows you are in your element.',
      rarity: 'Common'
    },
    speed_runner: {
      title: 'Speed Runner',
      narrative: 'Quick thinking combined with accuracy. You solved a lesson in record time.',
      rarity: 'Rare'
    },
    comeback_kid: {
      title: 'Comeback Kid',
      narrative: 'From the brink of defeat, you seized victory. Resilience defines champions.',
      rarity: 'Epic'
    },
    consistency: {
      title: 'Consistency',
      narrative: 'Day after day, you return. Your dedication shows in your streaks.',
      rarity: 'Legendary'
    }
  },

  // Game intro/tutorial
  tutorial: {
    welcomeHeading: 'Welcome to Skora Academy',
    welcomeText: `You stand at the threshold of a grand adventure. This is not just a learning platform—
    it is a journey of transformation. Each lesson conquered is a battle won. Each question answered correctly 
    is a step toward greatness. Will you rise to become a Legend?`,
    mechanics: [
      'Complete lessons to progress through ranks',
      'Earn XP through correct answers and daily streaks',
      'Unlock cosmetics and titles as you rank up',
      'Complete daily quests for bonus rewards',
      'Climb the leaderboard to prove your supremacy'
    ],
    callToAction: 'The knowledge realm awaits. Will you answer the call?'
  },

  // Profile/Dashboard messages
  profile: {
    profileGreeting: 'Your achievements speak volumes about your dedication.',
    cosmeticsMessage: 'Choose your identity. These cosmetics represent your journey.',
    leaderboardMessage: 'Where do you stand among the greatest minds?'
  },

  // Streak-related messages
  streaks: {
    streakBuilding: (count: number) => `You are on a ${count}-day streak! Keep the momentum going.`,
    streakBonus: 'Your dedication multiplies your rewards. Streaks unlock hidden bonuses.',
    streakBroken: 'Your streak has ended. Claim your daily bonus tomorrow to begin anew.'
  },

  // General motivational quotes
  quotes: [
    'Knowledge is the ultimate power.',
    'Every master was once a student.',
    'Consistency beats intensity.',
    'Your potential is limitless.',
    'The journey of a thousand miles begins with a single question.',
    'In knowledge, we find strength.',
    'Rise up. The world awaits your greatness.'
  ]
};

// Helper to get random quote
export function getRandomQuote(): string {
  return narrativeContent.quotes[Math.floor(Math.random() * narrativeContent.quotes.length)];
}

// Helper to get rank-specific message
export function getRankMessage(rankId: string): string {
  const rank = narrativeContent.ranks[rankId as keyof typeof narrativeContent.ranks];
  return rank ? rank.welcomeMessage : 'Welcome to your journey.';
}
