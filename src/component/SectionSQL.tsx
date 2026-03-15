import React from 'react';
import SkoraPixelCard from './SkoraPixelCard';
import ConnectorLine from './ConnectorLine';
import type { SkillId } from '../data/skoraSkillInfo'; 

interface SectionProps {
  onHover: (id: SkillId | null) => void; 
}

const VERTICAL_LINE_HEIGHT = 'h-14';

const SectionSQL: React.FC<SectionProps> = ({ onHover }) => {
  return (
    <div className="flex flex-col items-center relative">
      <SkoraPixelCard 
        label="SQL" 
        color="brown" 
        size="lg" 
        className="w-48"
      />
      
      <ConnectorLine orientation="vertical" length={VERTICAL_LINE_HEIGHT} className="mt-2" />

      <SkoraPixelCard 
        label="Data Retrieval" 
        color="brown" 
        skillId="sql_ret" 
        onHover={onHover} 
        className="w-48"
      />
      
      <ConnectorLine orientation="vertical" length={VERTICAL_LINE_HEIGHT} />
      
      <SkoraPixelCard 
        label="Aggregation & Sorting" 
        color="brown" 
        skillId="sql_agg" 
        onHover={onHover} 
        className="w-48"
      />
      
      <ConnectorLine orientation="vertical" length={VERTICAL_LINE_HEIGHT} />
      
      <SkoraPixelCard 
        label="Joins & Schemas" 
        color="brown" 
        skillId="sql_join" 
        onHover={onHover} 
        className="w-48"
      />
      
      <ConnectorLine orientation="vertical" length={VERTICAL_LINE_HEIGHT} />

      <SkoraPixelCard 
        label="Filtering Groups" 
        color="brown" 
        skillId="sql_filt" 
        onHover={onHover} 
        className="w-48"
      />

    </div>
  );
};

export default SectionSQL;