// src/pages/Signup.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !email || !password) {
      setError("Please fill all required fields.");
      return;
    }
    if (password !== confirmPass) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 900));
      navigate("/signup-success");
    } catch (err: any) {
      setError(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: "url('/Signup.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      {/* Astronaut LEFT – absolutely positioned (does NOT move the card) */}
      <img
        src="/public/astraunaut.png"
        alt="astronaut"
        className="
          hidden md:block      /* show only on medium+ screens */
          w-56 
          absolute 
          left-[12%] 
          top-1/2 
          -translate-y-1/2 
          animate-bounce-slow 
          drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]
        "
      />

      {/* SIGNUP CARD – perfectly centered */}
      <div
        className="
          w-full max-w-md
          bg-[#0f0f1f] 
          p-8 
          rounded-xl 
          shadow-[0_0_25px_rgba(203,131,79,0.55)]
          text-white
          relative z-10
        "
      >
        <h1 className="font-['Press_Start_2P'] text-[18px] text-[#ffe600] mb-2">
          Sign Up
        </h1>

        <p className="text-sm text-gray-300 mb-6">Begin your Skora journey</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full bg-[#1e1e2f] border-2 border-[#444] rounded-md px-3 py-2
            text-white placeholder:text-gray-400 focus:border-[#ffe600] outline-none"
            required
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full bg-[#1e1e2f] border-2 border-[#444] rounded-md px-3 py-2
            text-white placeholder:text-gray-400 focus:border-[#ffe600] outline-none"
            required
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full bg-[#1e1e2f] border-2 border-[#444] rounded-md px-3 py-2
            text-white placeholder:text-gray-400 focus:border-[#ffe600] outline-none"
            required
          />

          <input
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            className="w-full bg-[#1e1e2f] border-2 border-[#444] rounded-md px-3 py-2
            text-white placeholder:text-gray-400 focus:border-[#ffe600] outline-none"
            required
          />

          {error && <div className="text-sm text-red-400">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full bg-[#cb834f] text-[#0f0f1f] rounded-md py-3
              font-['Press_Start_2P'] text-[12px]
              border-4 border-[#ff6a00]
              shadow-[0_4px_10px_rgba(255,106,0,0.6)]
              disabled:opacity-60
              transition-all duration-200 ease-in-out
              hover:shadow-[0_6px_15px_rgba(255,106,0,0.8)]
              hover:scale-105 active:scale-95
            "
          >
            {loading ? "CREATING..." : "Create Account"}
          </button>
        </form>

        <p className="text-xs text-gray-300 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-[#ffe600] underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
