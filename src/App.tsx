import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DashboardHome } from './pages/DashboardHome';
import { CoursePage } from './pages/CoursePage';
import { LessonPage } from './pages/LessonPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/course/:courseId/lesson/:lessonId" element={<LessonPage />} />
      </Routes>
    </Router>
  );
}