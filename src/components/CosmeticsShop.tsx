import React, { useState } from 'react';

export type CosmeticType = 'frame' | 'title' | 'theme' | 'effect';

export interface Cosmetic {
  id: string;
  name: string;
  description: string;
  type: CosmeticType;
  icon: string;
  unlockedAt: string; // rank name
  isEquipped?: boolean;
}

interface CosmeticsShopProps {
  unlockedCosmetics: string[];
  equippedCosmetics: Record<CosmeticType, string>;
  onEquip: (cosmeticId: string, type: CosmeticType) => void;
}

const COSMETIC_CATALOG: Cosmetic[] = [
  // Frames
  {
    id: 'emerald_frame',
    name: 'Emerald Frame',
    description: 'A shimmering emerald border',
    type: 'frame',
    icon: '💚',
    unlockedAt: 'Apprentice'
  },
  {
    id: 'gold_frame',
    name: 'Gold Frame',
    description: 'A classic gold frame',
    type: 'frame',
    icon: '💛',
    unlockedAt: 'Warrior'
  },
  {
    id: 'platinum_frame',
    name: 'Platinum Frame',
    description: 'A prestigious platinum border',
    type: 'frame',
    icon: '🤍',
    unlockedAt: 'Champion'
  },
  {
    id: 'diamond_frame',
    name: 'Diamond Frame',
    description: 'The ultimate crystalline frame',
    type: 'frame',
    icon: '💎',
    unlockedAt: 'Legend'
  },
  
  // Titles
  {
    id: 'scholar_title',
    name: 'Scholar',
    description: '+10% XP from lessons',
    type: 'title',
    icon: '📚',
    unlockedAt: 'Apprentice'
  },
  {
    id: 'warrior_title',
    name: 'Warrior',
    description: 'Battle title - increased difficulty',
    type: 'title',
    icon: '⚔️',
    unlockedAt: 'Warrior'
  },
  {
    id: 'champion_title',
    name: 'Champion',
    description: 'Display your mastery',
    type: 'title',
    icon: '🏆',
    unlockedAt: 'Champion'
  },
  {
    id: 'legend_title',
    name: 'Legend',
    description: 'The highest honor',
    type: 'title',
    icon: '👑',
    unlockedAt: 'Legend'
  },
  
  // Themes
  {
    id: 'red_theme',
    name: 'Crimson',
    description: 'Fiery red color scheme',
    type: 'theme',
    icon: '🔴',
    unlockedAt: 'Warrior'
  },
  {
    id: 'purple_theme',
    name: 'Mystic',
    description: 'Purple theme with mystical accents',
    type: 'theme',
    icon: '🟣',
    unlockedAt: 'Champion'
  },
  {
    id: 'gold_theme',
    name: 'Sovereign',
    description: 'Golden theme for the elite',
    type: 'theme',
    icon: '🟡',
    unlockedAt: 'Legend'
  },
  
  // Effects
  {
    id: 'halo_effect',
    name: 'Halo Effect',
    description: 'Glowing aura around your profile',
    type: 'effect',
    icon: '✨',
    unlockedAt: 'Legend'
  }
];

export const CosmeticsShop: React.FC<CosmeticsShopProps> = ({ unlockedCosmetics, equippedCosmetics, onEquip }) => {
  const [selectedCategory, setSelectedCategory] = useState<CosmeticType>('frame');

  const filteredCosmetics = COSMETIC_CATALOG.filter(c => c.type === selectedCategory);

  const categories: { type: CosmeticType; label: string; icon: string }[] = [
    { type: 'frame', label: 'Frames', icon: '🖼️' },
    { type: 'title', label: 'Titles', icon: '📜' },
    { type: 'theme', label: 'Themes', icon: '🎨' },
    { type: 'effect', label: 'Effects', icon: '✨' }
  ];

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="border-4 border-[var(--border-color)] bg-[var(--bg-sidebar)] p-8 relative">
        <div className="absolute -top-3 -left-3 bg-[var(--bg-main)] border-2 border-[var(--border-color)] p-1 text-yellow-400">
          🛍️
        </div>
        <h2 className="text-3xl font-pixel text-yellow-400 uppercase mb-2">Cosmetics Shop</h2>
        <p className="text-xs font-mono text-[var(--text-muted)]">
          Unlock new looks as you progress through ranks
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat.type}
            onClick={() => setSelectedCategory(cat.type)}
            className={`px-4 py-2 border-2 font-pixel text-xs uppercase transition-all ${
              selectedCategory === cat.type
                ? 'bg-[var(--accent)] border-[var(--accent)] text-black'
                : 'border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--accent)]/50'
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Cosmetics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCosmetics.map(cosmetic => {
          const isUnlocked = unlockedCosmetics.includes(cosmetic.id);
          const isEquipped = equippedCosmetics[cosmetic.type] === cosmetic.id;
          
          return (
            <div
              key={cosmetic.id}
              className={`border-2 p-4 transition-all ${
                isUnlocked
                  ? isEquipped
                    ? 'bg-[var(--accent)]/20 border-[var(--accent)] shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)]'
                    : 'bg-black/30 border-[var(--border-color)] hover:border-[var(--accent)]/50'
                  : 'bg-black/60 border-gray-700 opacity-60'
              }`}
            >
              {/* Icon */}
              <div className="text-5xl text-center mb-3">{cosmetic.icon}</div>

              {/* Name & Type */}
              <h3 className="font-pixel text-[11px] text-[var(--text-main)] uppercase mb-1 text-center">
                {cosmetic.name}
              </h3>
              <p className="text-[9px] text-[var(--text-muted)] text-center mb-3 h-8">
                {cosmetic.description}
              </p>

              {/* Unlock Info or Buttons */}
              {isUnlocked ? (
                <div className="space-y-2">
                  {isEquipped ? (
                    <div className="w-full py-2 bg-[var(--accent)] text-black font-pixel text-[10px] text-center uppercase rounded">
                      ✓ Equipped
                    </div>
                  ) : (
                    <button
                      onClick={() => onEquip(cosmetic.id, cosmetic.type)}
                      className="w-full py-2 bg-[var(--accent)] text-black font-pixel text-[10px] text-center uppercase rounded hover:bg-[var(--accent)]/80 transition-all"
                    >
                      Equip
                    </button>
                  )}
                </div>
              ) : (
                <div className="w-full py-2 bg-gray-900 text-gray-400 font-pixel text-[9px] text-center uppercase rounded border border-gray-700">
                  🔒 {cosmetic.unlockedAt}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Info */}
      <div className="border-2 border-dashed border-[var(--border-color)] bg-black/20 p-6 rounded">
        <p className="text-[11px] font-pixel text-[var(--text-muted)] uppercase mb-3">
          📊 Cosmetics Progress
        </p>
        <div className="text-sm font-mono text-[var(--text-main)]">
          <p>Unlocked: <span className="text-[var(--accent)]">{unlockedCosmetics.length}</span> / {COSMETIC_CATALOG.length}</p>
          <p className="text-[var(--text-muted)] text-xs mt-2">
            Earn cosmetics by reaching higher ranks and completing challenges
          </p>
        </div>
      </div>
    </div>
  );
};
