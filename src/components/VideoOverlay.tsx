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
  redirectAfterClose?: string | null;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({
  src = "/hero-video.mp4",
  poster,
  onClose,
  autoShow = true,
  loop = false,
  redirectAfterClose = "/signup", // 🔥 Now redirects to SIGNUP
}) => {
  const [visible, setVisible] = useState(autoShow);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!visible) return;
      if (e.key === "Escape") handleClose();
      if (e.key.toLowerCase() === "m") toggleMute();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [visible, muted]);

  // Try unmuted autoplay
  useEffect(() => {
    if (visible && videoRef.current) {
      const v = videoRef.current;

      v.muted = false;
      setMuted(false);

      const playPromise = v.play();

      if (playPromise && playPromise.catch) {
        playPromise.catch(() => {
          v.muted = true;
          setMuted(true);
          v.play().catch(() => {});
        });
      }
    }
  }, [visible]);

  // Mute handler
  useEffect(() => {
    if (visible && videoRef.current) {
      const v = videoRef.current;
      v.muted = muted;
      const p = v.play();
      if (p?.catch) p.catch(() => {});
    }
  }, [visible, muted]);

  const handleClose = () => {
    setVisible(false);
    videoRef.current?.pause();
    onClose?.();
    navigate("/signup"); // 🔥 Redirects to SIGNUP
  };

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      if (videoRef.current) videoRef.current.muted = next;
      return next;
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">

      {/* ⭐ PIXEL SKIP BUTTON — TOP RIGHT */}
      <button
        onClick={handleClose}
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
            navigate("/signup"); // 🔥 Also on end → signup
          }}
        />

        {/* PIXEL MUTE BUTTON */}
       <button
  onClick={() => {
    toggleMute();
    const btn = document.getElementById("mute-btn");
    if (btn) {
      btn.classList.remove("pixel-press");
      void btn.offsetWidth; // restart animation trick
      btn.classList.add("pixel-press");
    }
  }}
  id="mute-btn"
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
