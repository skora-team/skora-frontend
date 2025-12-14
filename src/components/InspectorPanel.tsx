// src/components/InspectorPanel.tsx
import { Lock } from "lucide-react";
import type { Lesson } from "../types";

interface InspectorPanelProps {
  lesson: Lesson | null;
}

export function InspectorPanel({ lesson }: InspectorPanelProps) {
  if (!lesson) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: "110%",
        transform: "translateX(-50%)",
        width: "260px",

        backgroundColor: "rgba(30, 58, 138, 0.85)", // 🔵 blue transparent
        borderRadius: "14px",                      // 🔥 curved box
        padding: "14px",
        border: "2px solid rgba(148,163,184,0.6)",
        boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
        backdropFilter: "blur(6px)",
        zIndex: 50,

        fontFamily: "'Press Start 2P', cursive",
      }}
    >
      {/* 🔒 LOCKED MESSAGE */}
      {lesson.status === "locked" && (
        <div
          style={{
            backgroundColor: "rgba(220,38,38,0.35)", // 🔴 transparent red
            border: "1px solid rgba(248,113,113,0.6)",
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "10px",
            display: "flex",
            gap: "6px",
            alignItems: "center",
            fontSize: "9px",
            color: "#fee2e2",
          }}
        >
          <Lock size={12} />
          <span>Complete previous mission to unlock</span>
        </div>
      )}

      {/* 🟡 TITLE */}
      <div
        style={{
          color: "#facc15",        // yellow
          fontSize: "12px",        // 🔽 smaller title
          marginBottom: "8px",
          textTransform: "uppercase",
        }}
      >
        {lesson.title}
      </div>

      {/* 📝 DESCRIPTION */}
      <div
        style={{
          color: "#e5e7eb",
          fontSize: "9px",         // 🔽 smaller than title
          lineHeight: "1.6",
        }}
      >
        {lesson.description}
      </div>
    </div>
  );
}
