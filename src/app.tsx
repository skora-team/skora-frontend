import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./about"; // or "./About" depending on your file name
import VideoPage from "./pages/VideoPage";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<Home />} />

      {/* About page */}
      <Route path="/about" element={<About />} />

      {/* Video page */}
      <Route path="/video" element={<VideoPage />} />
    </Routes>
  );
};

export default App;
