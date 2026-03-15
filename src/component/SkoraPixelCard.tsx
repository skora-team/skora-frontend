import React from 'react';
import type { SkillId } from '../data/skoraSkillInfo'; 
import SkoraSprites from './SkoraSprites';

type CardColor = "yellow" | "blue" | "brown";
type CardSize = "md" | "lg";

interface SkoraPixelCardProps {
  label: string;
  color: CardColor;
  skillId?: SkillId;
  onHover?: (id: SkillId | null) => void; 
  size?: CardSize;
  className?: string;
}

const SkoraPixelCard: React.FC<SkoraPixelCardProps> = ({ 
  label, 
  color, 
  skillId, 
  onHover, 
  size = "md", 
  className 
}) => {

  const isLarge = size === "lg";

  const colorClasses: Record<CardColor, { bg: string, border: string, glow: string }> = {
    yellow: {
      bg: 'bg-skora-python-main',
      border: 'border-skora-python-main',
      glow: 'shadow-pixel-glow-yellow hover:shadow-skora-glow-python',
    },
    blue: {
      bg: 'bg-skora-r-main',
      border: 'border-skora-r-main',
      glow: 'shadow-pixel-glow-blue hover:shadow-skora-glow-blue',
    },
    brown: {
      bg: 'bg-skora-sql-main',
      border: 'border-skora-sql-main',
      glow: 'shadow-pixel-glow-brown hover:shadow-skora-glow-sql',
    },
  };

  const { bg, border, glow } = colorClasses[color];
  const padding = isLarge ? 'px-6 py-3' : 'px-4 py-2';
  const fontSize = isLarge ? 'text-lg' : 'text-xs';

 
  const handleMouseEnter = () => {
    if (skillId && onHover) onHover(skillId);
  };

  const handleMouseLeave = () => {
    if (skillId && onHover) onHover(null);
  };

  return (
    <div 
      className={`
        ${className} 
        ${bg} 
        ${padding} 
        ${fontSize} 
        ${glow}
        ${border}
        border-4 
        border-solid 
        text-black 
        shadow-pixel-shadow 
        font-press-start 
        transition-all 
        duration-150 
        hover:scale-[1.03] 
        cursor-pointer 
        flex 
        items-center 
        justify-center 
        whitespace-nowrap 
        rounded-sm
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Icon Slot */}
      {skillId && (
        <span className="mr-3">
          <SkoraSprites skillId={skillId} />
        </span>
      )}
      {label}
    </div>
  );
};

export default SkoraPixelCard;