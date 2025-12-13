import { useState } from "react";
import type { Lesson } from "../types";
import clsx from "clsx";

interface LessonNodeProps {
  lesson: Lesson;
  isLast: boolean;
}

export function LessonNode({ lesson, isLast }: LessonNodeProps) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      {/* ================= INFO BOX ================= */}
      {showInfo && (
        <div
          className="absolute bottom-full mb-3 z-50 w-[260px]"
          style={{
            background: "rgba(30, 58, 138, 0.85)", // blue transparent
            borderRadius: "12px",
            padding: "12px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
            fontFamily: "'Press Start 2P', cursive",
          }}
        >
          {/* 🔒 LOCK MESSAGE */}
          {lesson.status === "locked" && (
            <div
              style={{
                background: "rgba(220,38,38,0.35)", // red transparent
                borderRadius: "8px",
                padding: "6px 8px",
                marginBottom: "8px",
                fontSize: "9px",
                color: "#fecaca",
              }}
            >
              🔒 COMPLETE PREVIOUS MISSION TO UNLOCK
            </div>
          )}

          {/* TITLE */}
          <div
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "#facc15", // yellow
              marginBottom: "6px",
              textTransform: "uppercase",
            }}
          >
            {lesson.title}
          </div>

          {/* DESCRIPTION */}
          <div
            style={{
              fontSize: "10px",
              lineHeight: "1.4",
              color: "#e5e7eb",
            }}
          >
            {lesson.description}
          </div>
        </div>
      )}

      {/* ================= CHEST ================= */}
      <div
        className={clsx(
          "transition-all duration-200",
          lesson.status === "unlocked" &&
            "cursor-pointer animate-bounce-pixel hover:scale-110",
          lesson.status === "locked" &&
            "opacity-60 grayscale cursor-not-allowed"
        )}
        style={{ width: 96, height: 96 }}
      >
        <svg
          viewBox="0 0 32 32"
          className="w-full h-full"
          shapeRendering="crispEdges"
        >
          <path d="M4 10 h24 v18 h-24 z" fill="#09090b" />
          <path d="M4 10 h24 v-4 h-24 z" fill="#09090b" />
          <rect x="6" y="10" width="20" height="16" fill="#be123c" />
          <rect x="6" y="20" width="20" height="2" fill="#881337" />
          <path d="M6 6 h20 v5 h-20 z" fill="#be123c" />
          <rect x="6" y="8" width="20" height="1" fill="#fb7185" />
          <rect x="6" y="6" width="4" height="22" fill="#475569" />
          <rect x="22" y="6" width="4" height="22" fill="#475569" />
          <path d="M13 10 h6 v8 l-3 3 l-3 -3 z" fill="#fbbf24" />
        </svg>
      </div>

      {/* ================= LABEL ================= */}
      <div className="mt-3 text-xs font-bold text-center text-slate-800 max-w-[160px]">
        {lesson.title}
      </div>

      {/* ================= CONNECTOR ================= */}
      {!isLast && (
        <div
          className="w-[4px] h-[36px] bg-red-600"
          style={{
            boxShadow: "0 0 10px rgba(220,38,38,0.8)",
          }}
        />
      )}
    </div>
  );
}
