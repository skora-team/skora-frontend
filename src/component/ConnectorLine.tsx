import React from 'react';

interface ConnectorLineProps {
  orientation: "vertical" | "horizontal";
  length: string; 
  className?: string;
}

const ConnectorLine: React.FC<ConnectorLineProps> = ({ orientation, length, className }) => {
  const orientationClass = orientation === "vertical" ? length : 'h-[6px]';
  const dimensionClass = orientation === "horizontal" ? length : 'w-[6px]';

  return (
    <div
      className={`
        bg-skora-neon-orange 
        shadow-sm 
        shadow-skora-neon-orange 
        ${orientationClass} 
        ${dimensionClass} 
        ${className}
      `}
    />
  );
};

export default ConnectorLine;