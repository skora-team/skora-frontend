// src/pages/VideoPage.tsx
import React from "react";
import VideoOverlay from "../components/VideoOverlay";

const VideoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* VideoOverlay will show the video fullscreen */}
      <VideoOverlay
        src="public/video 4.mp4"   // put your video in public/hero-video.mp4
        poster="/hero-poster.jpg"
        loop={false}
        autoShow={true}
      />
    </div>
  );
};

export default VideoPage;
