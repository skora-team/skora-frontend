import React from 'react';
import SkoraPixelCard from './SkoraPixelCard';
import ConnectorLine from './ConnectorLine';
import type { SkillId } from '../data/skoraSkillInfo';

interface SectionProps {
  
  onHover: (id: SkillId | null) => void; 
}

const VERTICAL_LINE_HEIGHT = 'h-14';

const SectionPython: React.FC<SectionProps> = ({ onHover }) => {
  return (
    <div className="flex flex-col items-center relative">
      <SkoraPixelCard 
        label="Python" 
        color="yellow" 
        size="lg" 
        className="w-48"
      />
      
      <ConnectorLine orientation="vertical" length={VERTICAL_LINE_HEIGHT} className="mt-2" />

      <SkoraPixelCard 
        label="Fundamentals" 
        color="yellow" 
        skillId="py_fund" 
        onHover={onHover} 
        className="w-48"
      />
      
      <ConnectorLine orientation="vertical" length={VERTICAL_LINE_HEIGHT} />
      
      <SkoraPixelCard 
        label="Stats & Matrix" 
        color="yellow" 
        skillId="py_stats" 
        onHover={onHover} 
        className="w-48"
      />
      
      <ConnectorLine orientation="vertical" length={VERTICAL_LINE_HEIGHT} />
      
      <SkoraPixelCard 
        label="Advanced Data & Visualization" 
        color="yellow" 
        skillId="py_adv" 
        onHover={onHover} 
        className="w-48"
      />
      
      <ConnectorLine orientation="vertical" length={VERTICAL_LINE_HEIGHT} />

      <SkoraPixelCard 
        label="System & Optimization"
        color="yellow" 
        skillId="py_sys" 
        onHover={onHover} 
        className="w-48"
      />

    </div>
  );
};

export default SectionPython;