import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SkillTreePage } from './pages/SkillTreePage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SkillTreePage />} />
        <Route path="/skill-tree" element={<SkillTreePage />} />
      </Routes>
    </Router>
  );
}