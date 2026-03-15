import React from 'react';

interface ConnectorCurveProps {
  direction: "left" | "right" | "center";
  height: number;
  className?: string;
}

const ConnectorCurve: React.FC<ConnectorCurveProps> = ({ direction, className }) => {
  
  
  if (direction === "left") {
    return (
      <div 
        className={`absolute w-12 h-12 border-t-[6px] border-r-[6px] border-skora-neon-orange shadow-sm shadow-skora-neon-orange rounded-tr-3xl -top-6 -left-6 ${className}`}
        style={{ borderRadius: '0 100% 0 0' }}
      ></div>
    );
  } else if (direction === "right") {
    return (
      <div 
        className={`absolute w-12 h-12 border-t-[6px] border-l-[6px] border-skora-neon-orange shadow-sm shadow-skora-neon-orange rounded-tl-3xl -top-6 -right-6 ${className}`}
        style={{ borderRadius: '100% 0 0 0' }}
      ></div>
    );
  }
  
  return null;
};

export default ConnectorCurve;