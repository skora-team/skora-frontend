// src/components/VideoOverlay.tsx
import React, { useEffect, useRef, useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface VideoOverlayProps {
  src?: string;
  poster?: string;
  onClose?: () => void;
  autoShow?: boolean;
  loop?: boolean;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({
  src = "/hero-video.mp4",
  poster,
  onClose,
  autoShow = true,
  loop = false,
}) => {
  const [visible, setVisible] = useState(autoShow);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  // Keyboard shortcuts (Esc to close, m to toggle mute)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!visible) return;
      if (e.key === "Escape") handleClose();
      if (e.key.toLowerCase() === "m") handleMuteClick();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, muted]);

  // Try to autoplay unmuted because the user clicked "Get Started" (user gesture)
  useEffect(() => {
    if (visible && videoRef.current) {
      const v = videoRef.current;

      // Try to start unmuted (best-effort). If blocked by browser, fallback to muted autoplay.
      v.muted = false;
      setMuted(false);

      const playPromise = v.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          v.muted = true;
          setMuted(true);
          v.play().catch(() => {});
        });
      }
    }
  }, [visible]);

  // Keep video muted state in sync and ensure it plays
  useEffect(() => {
    if (visible && videoRef.current) {
      const v = videoRef.current;
      v.muted = muted;
      const p = v.play();
      if (p && typeof p.then === "function") p.catch(() => {});
    }
  }, [visible, muted]);

  const handleClose = () => {
    setVisible(false);
    videoRef.current?.pause();
    onClose?.();
    navigate("/signup");
  };

  const toggleMuteState = (next: boolean) => {
    setMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  };

  const toggleMute = () => {
    toggleMuteState(!muted);
  };

  // helper invoked by keyboard 'm' and by click wrapper to animate
  const handleMuteClick = () => {
    // animate button
    const btn = document.getElementById("mute-btn");
    if (btn) {
      btn.classList.remove("pixel-press");
      // restart animation
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      void (btn as HTMLElement).offsetWidth;
      btn.classList.add("pixel-press");
    }
    toggleMute();
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Intro video"
    >
      {/* PIXEL SKIP BUTTON — TOP RIGHT (redirects to /signup) */}
      <button
        onClick={handleClose}
        aria-label="Skip and go to signup"
        className="
          absolute top-4 right-4 z-60
          bg-[#F9CF4F]
          text-black
          font-['Press_Start_2P']
          text-[10px]
          px-4 py-2
          border-4 border-black
          shadow-[0_4px_0_0_#000]
          active:translate-y-[2px]
          active:shadow-[0_2px_0_0_#000]
          hover:bg-[#ffefb5]
          pixel-btn
        "
      >
        SKIP
      </button>

      {/* VIDEO */}
      <div className="relative w-full max-w-4xl mx-auto">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          loop={loop}
          playsInline
          muted={muted}
          controls={false}
          className="w-full h-auto rounded-xl shadow-2xl bg-black"
          onEnded={() => {
            setVisible(false);
            navigate("/signup");
          }}
        />

        {/* PIXEL MUTE BUTTON — BOTTOM RIGHT (icon only) */}
        <button
          id="mute-btn"
          onClick={handleMuteClick}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="
            absolute 
            bottom-4 
            right-4 
            z-50
            bg-[#F9CF4F]
            border-4 
            border-[#000]
            shadow-[0_4px_0_0_#000]
            w-12 
            h-12 
            flex 
            items-center 
            justify-center
            pixel-btn
          "
        >
          {muted ? (
            <FaVolumeMute className="text-black text-2xl" />
          ) : (
            <FaVolumeUp className="text-black text-2xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoOverlay;
