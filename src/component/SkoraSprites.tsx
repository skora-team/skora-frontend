import React from 'react';
import type { SkillId } from '../data/skoraSkillInfo'; 

interface SkoraSpriteProps {
  skillId?: SkillId;
  children?: React.ReactNode;
}

const SkoraSprites: React.FC<SkoraSpriteProps> = ({ skillId, children }) => {
  const icon = skillId ? getIconForSkill(skillId) : (children || '🌟');
  
  return (
    <div className="text-xl leading-none" style={{ textShadow: '2px 2px 0 #000' }}>
      {icon}
    </div>
  );
};

const getIconForSkill = (skillId: SkillId): string => {
  switch (skillId) {
    case 'py_fund':
    case 'r_fund':
      return '⚙️';
    case 'py_stats':
    case 'sql_agg':
      return '🔢';
    case 'py_adv':
      return '📊';
    case 'py_sys':
      return '🚀';
    case 'r_stats':
      return '🛠️';
    case 'r_adv':
      return '💾';
    case 'r_sys':
      return '🏁';
    case 'sql_ret':
      return '🔎';
    case 'sql_join':
      return '🔗';
    case 'sql_filt':
      return '🛡️';
    default:
      return '❓';
  }
};

export default SkoraSprites;