import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VideoPage from "./pages/VideoPage";
import SkillTreePage from "./pages/SkillTreePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/video" element={<VideoPage />} />

      {/* Skill Tree routes */}
      <Route path="/skills" element={<SkillTreePage />} />
      <Route path="/skill-tree" element={<SkillTreePage />} />
    </Routes>
  );
}
