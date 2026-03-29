import React, { useEffect, useState } from 'react';

interface XPFloatingTextProps {
  amount: number;
  isVisible: boolean;
}

export const XPFloatingText: React.FC<XPFloatingTextProps> = ({ amount, isVisible }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed pointer-events-none font-bold font-pixel text-lg ${
        animate ? 'animate-bounce' : ''
      }`}
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) ${animate ? 'translateY(-40px)' : ''}`,
        color: '#22c55e',
        textShadow: '0 0 10px rgba(34, 197, 94, 0.8)',
        opacity: animate ? 0 : 1,
        transition: 'all 1.5s ease-out',
        zIndex: 50,
      }}
    >
      +{amount} XP
    </div>
  );
};
