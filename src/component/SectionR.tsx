import React from 'react';
import SkoraPixelCard from './SkoraPixelCard';
import ConnectorLine from './ConnectorLine';
import type { SkillId } from '../data/skoraSkillInfo';

interface SectionProps {
  
  onHover: (id: SkillId | null) => void; 
}

const VERTICAL_LINE_HEIGHT = 'h-14';

const SectionR: React.FC<SectionProps> = ({ onHover }) => {
  return (
    <div className="flex flex-col items-center relative">
      
      {/* 1. Header Card */}
      <SkoraPixelCard 
        label="R" 
        color="blue" 
        size="lg" 
        className="w-48"
      />
      
      <ConnectorLine orientation="vertical" length={VERTICAL_LINE_HEIGHT} className="mt-2" />

      {/* 2. First Skill Card */}
      <SkoraPixelCard 
        label="Control Structure" 
        color="blue" 
        skillId="r_fund" 
        onHover={onHover} 
        className="w-48"
      />
      
      <ConnectorLine orientation="vertical" length={VERTICAL_LINE_HEIGHT} />
      
      {/* 3. Second Skill Card */}
      <SkoraPixelCard 
        label="Functions & Exceptions" 
        color="blue" 
        skillId="r_stats" 
        onHover={onHover} 
        className="w-48"
      />
      
      <ConnectorLine orientation="vertical" length={VERTICAL_LINE_HEIGHT} />
      
      {/* 4. Third Skill Card */}
      <SkoraPixelCard 
        label="OOP & File Handling" 
        color="blue" 
        skillId="r_adv" 
        onHover={onHover} 
        className="w-48"
      />

      <ConnectorLine orientation="vertical" length={VERTICAL_LINE_HEIGHT} />

      {/* 5. Fourth Skill Card */}
      <SkoraPixelCard 
        label="Advanced Data Manipulation" 
        color="blue" 
        skillId="r_sys" 
        onHover={onHover} 
        className="w-48"
      />
       </div>
  );
};

export default SectionR;