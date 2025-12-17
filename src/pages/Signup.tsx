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
    <>
      {/* ================= NAVBAR ================= */}
      {/* NAVBAR */}
            <nav className="w-full px-[7vw] py-3.5 flex items-center justify-between bg-black/60 backdrop-blur border-b border-white/10 fixed top-0 left-0 right-0 z-50">
              <div className="flex items-center gap-10">
                <Link to="/" className="flex items-center gap-3 font-bold text-lg">
                  <img src="/coin.png" className="w-[32px] h-[45px] image-render transition-transform duration-700 hover:-translate-y-1 hover:rotate-[360deg]" alt="coin" />
                  <img src="/logo.png" className="h-8" alt="logo" />
                </Link>
      
                {/* NAV LINKS */}
                <ul className="flex items-center gap-6 text-sm">
                
      
                  <li>
                    <Link to="/" className="hover:text-yellow-300 text-gray-300">Home</Link>
                  </li>
                </ul>
              </div>

        
            </nav>

      {/* ================= PAGE ================= */}
      <div
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24"
        style={{
          backgroundImage: "url('/Signup.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      >
        {/* ASTRONAUT – LEFT */}
        <img
          src="/astraunaut.png"
          alt="astronaut"
          className="
            hidden md:block
            absolute left-[10%] top-1/2 -translate-y-1/2
            w-56 animate-bounce-slow
            drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]
            pointer-events-none
          "
          style={{ imageRendering: "pixelated" }}
        />

        {/* DANCING GIF – BOTTOM RIGHT */}
        <img
          src="/wow.gif"
          alt="dancing"
          className="
            hidden md:block
            absolute right-[10%] bottom-[10%]
            w-40 animate-bounce-slow
            drop-shadow-[0_0_18px_rgba(255,203,79,0.45)]
            pointer-events-none
          "
          style={{ imageRendering: "pixelated" }}
        />
{/* 🚀 ROCKET + TEXT BUBBLE */}
<div className="
  hidden md:flex
  absolute
  top-[18%]
  left-1/2
  -translate-x-1/2
  -translate-y-1/2
  items-center
  gap-4
  z-20
">

  {/* ROCKET */}
  <img
    src="/Rocket.png"   // <-- your rocket image
    alt="rocket"
    className="
      w-24
      float-slow
      image-render
      drop-shadow-[0_0_18px_rgba(255,203,79,0.6)]
    "
  />

  {/* TEXT BUBBLE */}
  <div
    className="
      bg-[#0f0f1f]
      text-white
      px-4
      py-3
      border-4
      border-black
      shadow-[0_4px_0_0_#000]
      font-['Press_Start_2P']
      text-[10px]
      leading-relaxed
      float-slow
    "
  >
    Ready for launch?
  </div>

</div>

        {/* SIGNUP CARD – CENTER */}
        <div className="w-full max-w-md bg-[#0f0f1f] p-8 rounded-xl shadow-[0_0_25px_rgba(203,131,79,0.55)] text-white relative z-10">
          <h1 className="font-['Press_Start_2P'] text-[18px] text-[#ffe600] mb-2">
            Sign Up
          </h1>

          <p className="text-sm text-gray-300 mb-6">
            Begin your Skora journey
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full bg-[#1e1e2f] border-2 border-[#444] rounded-md px-3 py-2 text-white placeholder:text-gray-400 focus:border-[#ffe600] outline-none"
              required
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full bg-[#1e1e2f] border-2 border-[#444] rounded-md px-3 py-2 text-white placeholder:text-gray-400 focus:border-[#ffe600] outline-none"
              required
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full bg-[#1e1e2f] border-2 border-[#444] rounded-md px-3 py-2 text-white placeholder:text-gray-400 focus:border-[#ffe600] outline-none"
              required
            />

            <input
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-[#1e1e2f] border-2 border-[#444] rounded-md px-3 py-2 text-white placeholder:text-gray-400 focus:border-[#ffe600] outline-none"
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
    </>
  );
};

export default Signup;
