import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VideoPage from "./pages/VideoPage";
import SkillTreePage from "./pages/SkillTreePage";
import { DashboardHome } from "./pages/Dashboard/DashboardHome";
import { CoursePage } from './pages/Dashboard/CoursePage'; 
import { LessonPage } from './pages/Dashboard/LessonPage';
import { SettingsPage } from './pages/Dashboard/SettingsPage';

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

      {/* Dashboard routes */}
      <Route path="/DashboardHome" element={<DashboardHome />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/course/:courseId/lesson/:lessonId" element={<LessonPage />} />

    </Routes>
  );
}
