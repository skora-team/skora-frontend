import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./about"; // or "./About" depending on your file name

const App: React.FC = () => {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<Home />} />

      {/* About page */}
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default App;
