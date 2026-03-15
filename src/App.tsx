import React, { useState } from 'react';
import SkoraPixelCard from './component/SkoraPixelCard';
import ConnectorLine from './component/ConnectorLine';
import ConnectorCurve from './component/ConnectorCurve';
import SectionPython from './component/SectionPython';
import SectionR from './component/SectionR';
import SectionSQL from './component/SectionSQL';
import type { SkillId } from './data/skoraSkillInfo'; 
import SkoraInfoPanel from './component/SkoraInfoPanel';


const AIML_VERTICAL_DROP = 'h-16'; 
const HORIZONTAL_SPAN_WIDTH = 'w-64'; 

const App: React.FC = () => {
  const [activeSkillId, setActiveSkillId] = useState<SkillId | null>(null);

  const handleSkillHover = (id: SkillId | null) => {
    setActiveSkillId(id);
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center overflow-auto" style={{ backgroundImage: "repeating-linear-gradient(0deg, #0f0f1a, #0f0f1a 1px, #1a1a2e 1px, #1a1a2e 2px)", backgroundSize: '100% 100%' }}>
      
      <div className="mb-4 text-4xl font-press-start text-skora-neon-orange" 
           style={{ 
             textShadow: '0 0 10px #ff7b00, 0 0 20px #ff7b00, 4px 4px 0 #000', 
             filter: 'saturate(1.5)' 
           }}>
        <span className="relative z-10">AIML</span>
      </div>
      
      <SkoraPixelCard 
        label="AIML" 
        color="yellow" 
        size="lg" 
        className="w-48 mt-4" 
      />
      
      <div className="relative flex flex-col items-center">
        <ConnectorLine orientation="vertical" length={AIML_VERTICAL_DROP} className="mt-2" />
        
        <div className={`relative flex items-start ${HORIZONTAL_SPAN_WIDTH}`}>
          <ConnectorLine orientation="horizontal" length="w-full" className="absolute top-0 left-0 right-0 m-auto" />
          
          <div className="absolute top-0 left-[-16rem]">
            <ConnectorLine orientation="horizontal" length="w-64" className="absolute top-0 left-0" />
            <div className="absolute top-0 right-0 transform translate-x-[3px] -translate-y-[3px]">
              <ConnectorCurve direction="left" height={48} className="rotate-180" />
            </div>
          </div>
          
          <div className="absolute top-0 right-[-16rem]">
            <ConnectorLine orientation="horizontal" length="w-64" className="absolute top-0 right-0" />
            <div className="absolute top-0 left-0 transform -translate-x-[3px] -translate-y-[3px]">
              <ConnectorCurve direction="right" height={48} className="rotate-180" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 flex justify-center space-x-24 relative z-10">
        <SectionPython onHover={handleSkillHover} />
        <SectionR onHover={handleSkillHover} />
        <SectionSQL onHover={handleSkillHover} />
      </div>
      
      <div className="mt-16">
        <SkoraInfoPanel activeSkillId={activeSkillId} />
      </div>

    </div>
  );
};

export default App;