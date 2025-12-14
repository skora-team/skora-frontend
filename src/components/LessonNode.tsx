import { useState, useRef } from "react";
import type { Lesson } from "../types";
import clsx from "clsx";

interface LessonNodeProps {
  lesson: Lesson;
  isLast: boolean;
}

export function LessonNode({ lesson, isLast }: LessonNodeProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  // 🔊 sound ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = () => {
    if (lesson.status === "locked") return;
    if (isOpening) return;

    setIsOpening(true);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    setTimeout(() => {
      setIsOpening(false);
    }, 450);
  };

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      {/* 🔊 AUDIO */}
      <audio ref={audioRef} src="/public/chest-open.mp3" preload="auto" />

      {/* ================= INFO BOX ================= */}
      {showInfo && (
        <div
          className="absolute bottom-full mb-3 z-50 w-[260px]"
          style={{
            background: "rgba(30, 58, 138, 0.85)",
            borderRadius: "12px",
            padding: "12px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
            fontFamily: "'Press Start 2P', cursive",
          }}
        >
          {lesson.status === "locked" && (
            <div
              style={{
                background: "rgba(220,38,38,0.35)",
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

          <div
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "#facc15",
              marginBottom: "6px",
              textTransform: "uppercase",
            }}
          >
            {lesson.title}
          </div>

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

      {/* ================= CHEST IMAGE ================= */}
      <img
        src="/chests/treasure-chest.png"
        alt="Chest"
        onClick={handleOpen}
        className={clsx(
          "transition-all duration-200 select-none",
          lesson.status === "unlocked" &&
            "cursor-pointer hover:scale-110",
          lesson.status === "locked" &&
            "opacity-60 grayscale cursor-not-allowed",
          isOpening && "animate-chest-open"
        )}
        style={{
          width: 96,
          height: 96,
          imageRendering: "pixelated",
        }}
        draggable={false}
      />

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
