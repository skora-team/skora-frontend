import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaTiktok,
  FaDiscord,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111827] text-gray-300 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* COMPANY */}
        <div>
          <h3 className="text-white font-semibold mb-4">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li>About</li>
          </ul>
        </div>

        {/* PRACTICE */}
        <div>
          <h3 className="text-white font-semibold mb-4">PRACTICE</h3>
          <ul className="space-y-2 text-sm">
            <li>Challenges</li>
            <li>Projects</li>
            <li>Quizzes</li>
          </ul>
        </div>

        {/* LEARN */}
        <div>
          <h3 className="text-white font-semibold mb-4">LEARN</h3>
          <ul className="space-y-2 text-sm">
            <li>All Courses</li>
            <li>AIML</li>
             <li>Python</li>
            <li>R Programming</li>
            <li>SQL</li>
          </ul>
        </div>

        {/* TECH */}
        <div>
          <h3 className="text-white font-semibold mb-4">TECH</h3>
          <ul className="space-y-2 text-sm">
            <li>React</li>
            <li>Git & GitHub</li>
             <li>Fast Api</li>
            <li>SupaBase</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Made With Love */}
        <p className="text-sm text-gray-400">
          Made with <span className="text-red-500">❤️</span> in India,Kolhapur. 
        </p>

        {/* SOCIAL ICONS */}
        <div className="flex gap-4 text-xl text-gray-300">
          <FaInstagram className="hover:text-pink-500 cursor-pointer" />
          <FaTwitter className="hover:text-blue-400 cursor-pointer" />
          <FaGithub className="hover:text-gray-100 cursor-pointer" />
          <FaLinkedin className="hover:text-blue-600 cursor-pointer" />
          <FaTiktok className="hover:text-white cursor-pointer" />
          <FaDiscord className="hover:text-indigo-400 cursor-pointer" />
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="max-w-7xl mx-auto mt-6 text-gray-500 text-xs">
        © 2025 Skora, Inc. — Terms & Privacy Policy
      </div>
    </footer>
  );
};

export default Footer;
