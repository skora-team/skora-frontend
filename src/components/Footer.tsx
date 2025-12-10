import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaLinkedin,
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
            <li>
              <Link
                to="/about"
                className="hover:text-white transition"
              >
                About
              </Link>
            </li>
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
            <li>
              <a
                href="https://react.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                React
              </a>
            </li>
            <li>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                Git & GitHub
              </a>
            </li>
            <li>
              <a
                href="https://fastapi.tiangolo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                FastAPI
              </a>
            </li>
            <li>
              <a
                href="https://supabase.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                Supabase
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row justify-between items-center gap-4">

        <p className="text-sm text-gray-400">
          Made with <span className="text-red-500">❤️</span> in India, Kolhapur.
        </p>

        {/* SOCIAL ICONS */}
        <div className="flex gap-4 text-xl text-gray-300">

          <a
            href="https://www.instagram.com/skora_learning/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            <FaInstagram />
          </a>

          <a
            href="https://x.com/SkoraCrew"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaTwitter />
          </a>

          <a
            href="https://github.com/skora-team"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-100 transition"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/skora-undefined-2257293a0/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://discord.gg/acNA5nrb9q"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition"
          >
            <FaDiscord />
          </a>

        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 text-gray-500 text-xs">
        © 2025 Skora, Inc. — Terms & Privacy Policy
      </div>
    </footer>
  );
};

export default Footer;
