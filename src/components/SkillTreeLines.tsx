// src/components/SkillTreeLines.tsx

export function SkillTreeLines() {
  return (
    <svg
      className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
      width="900"
      height="260"
      viewBox="0 0 900 260"
    >
      <defs>
        {/* GLOW */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* FLOWING ENERGY */}
        <linearGradient id="energyFlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7f1d1d">
            <animate
              attributeName="offset"
              values="-1;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" stopColor="#ef4444">
            <animate
              attributeName="offset"
              values="0;2"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#7f1d1d">
            <animate
              attributeName="offset"
              values="1;3"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>

      {/* AIML DOWN */}
      <line
        x1="450"
        y1="70"
        x2="450"
        y2="120"
        stroke="url(#energyFlow)"
        strokeWidth="6"
        filter="url(#glow)"
      />

      {/* HORIZONTAL SPLIT */}
      <line
        x1="180"
        y1="120"
        x2="720"
        y2="120"
        stroke="url(#energyFlow)"
        strokeWidth="6"
        filter="url(#glow)"
      />

      {/* PYTHON */}
      <line
        x1="230"
        y1="120"
        x2="230"
        y2="170"
        stroke="url(#energyFlow)"
        strokeWidth="6"
        filter="url(#glow)"
      />

      {/* R */}
      <line
        x1="450"
        y1="120"
        x2="450"
        y2="170"
        stroke="url(#energyFlow)"
        strokeWidth="6"
        filter="url(#glow)"
      />

      {/* SQL */}
      <line
        x1="670"
        y1="120"
        x2="670"
        y2="170"
        stroke="url(#energyFlow)"
        strokeWidth="6"
        filter="url(#glow)"
      />
    </svg>
  );
}
