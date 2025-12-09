import React from 'react';
import type { SkillId } from '../data/skoraSkillInfo';
import { skills } from '../data/skoraSkillInfo';
import SkoraPixelCard from './SkoraPixelCard';

interface SkoraInfoPanelProps {
  activeSkillId: SkillId | null;
}

const SkoraInfoPanel: React.FC<SkoraInfoPanelProps> = ({ activeSkillId }) => {
  if (!activeSkillId) {
    return (
      <div className="w-64 h-32" />
    );
  }

  const skill = skills[activeSkillId];
  
  let color: "yellow" | "blue" | "brown" = "yellow";
  if (activeSkillId.startsWith('r_')) color = "blue";
  if (activeSkillId.startsWith('sql_')) color = "brown";

  return (
    <div className="p-4 bg-skora-dark-navy border-4 border-skora-neon-orange shadow-pixel-glow-yellow font-press-start text-white text-xs rounded-sm w-64">
      <SkoraPixelCard label={skill.label} color={color} size="md" className="mb-3 w-full" />
      <h3 className="text-sm mb-1" style={{ textShadow: '1px 1px 0 #000' }}>
        Skill: {skill.label}
      </h3>
      <p className="text-xs">
        {skill.description}
      </p>
    </div>
  );
};

export default SkoraInfoPanel;