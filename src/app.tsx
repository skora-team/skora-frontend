import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./about"; // or "./About" depending on your file name
import VideoPage from "./pages/VideoPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<Home />} />

      {/* About page */}
      <Route path="/about" element={<About />} />

      {/* Video page */}
      <Route path="/video" element={<VideoPage />} />

      {/* Login page */}
      <Route path="/login" element={<Login />} />

      {/* Signup page */}
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
