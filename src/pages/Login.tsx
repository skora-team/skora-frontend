import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError("Please fill both fields.");
      return;
    }

    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 700));
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="w-full px-[7vw] py-3.5 flex items-center justify-between bg-black/60 backdrop-blur border-b border-white/10 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3 font-bold text-lg">
            <img
              src="/coin.png"
              className="w-[32px] h-[45px] image-render transition-transform duration-700 hover:-translate-y-1 hover:rotate-[360deg]"
              alt="coin"
            />
            <img src="/logo.png" className="h-8" alt="logo" />
          </Link>

          <ul className="flex items-center gap-6 text-sm">
            {/* LEARN */}
            <li className="relative group cursor-pointer">
              <span className="text-gray-300 hover:text-yellow-300">
                Learn ▾
              </span>
              <div className="absolute hidden group-hover:block mt-2 w-40 bg-[#F9CF4F] rounded-lg border-2 border-black shadow-[0_6px_0_0_#000]">
                <a className="block px-4 py-2.5 text-sm text-black hover:bg-[#ffefb5]">
                  Python
                </a>
                <a className="block px-4 py-2.5 text-sm text-black hover:bg-[#ffefb5]">
                  R Program
                </a>
                <a className="block px-4 py-2.5 text-sm text-black hover:bg-[#ffefb5]">
                  SQL
                </a>
              </div>
            </li>

            {/* PRACTICE */}
            <li className="relative group cursor-pointer">
              <span className="text-gray-300 hover:text-yellow-300">
                Practice ▾
              </span>
              <div className="absolute hidden group-hover:block mt-2 w-40 bg-[#F9CF4F] rounded-lg border-2 border-black shadow-[0_6px_0_0_#000]">
                <a className="block px-4 py-2.5 text-sm text-black hover:bg-[#ffefb5]">
                  Quizzes
                </a>
                <a className="block px-4 py-2.5 text-sm text-black hover:bg-[#ffefb5]">
                  Exercises
                </a>
              </div>
            </li>

            <li>
              <Link to="/" className="hover:text-yellow-300 text-gray-300">
                Home
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* ================= LOGIN PAGE ================= */}
      <div
        className="min-h-screen flex items-center justify-center px-4 pt-24"
        style={{
          backgroundImage: "url('/login.gif')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      >
        {/* 👻 GHOST + TEXT BUBBLE */}
<div
  className="
    hidden md:flex     // 👈 HERE
    absolute
    top-[18%]
    left-1/2
    -translate-x-1/2
    -translate-y-1/2
    items-center
    gap-4
    z-20
  "
>
  <img
    src="/ghost.png"
    alt="ghost"
    className="w-24 float-slow image-render"
  />

  <div className="
    bg-[#0b0b12]
    text-gray-200
    px-4 py-3
    border-4 border-white/20
    font-['Press_Start_2P']
    text-[10px]
  ">
    Welcome back,
    <br />
    lost soul…
  </div>
</div>


        <div
          className="
            w-full max-w-md
            bg-[#0f0f1f]
            p-8
            rounded-xl
            shadow-[0_0_25px_rgba(203,131,79,0.55)]
            text-white
          "
        >
          <h1 className="font-['Press_Start_2P'] text-[18px] text-[#ffe600] mb-2">
            Login
          </h1>

          <p className="text-sm text-gray-300 mb-6">
            Welcome Back King!!
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username or Email"
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

            {error && (
              <div className="text-sm text-red-400">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full bg-[#cb834f] text-[#0f0f1f]
                rounded-md py-3
                font-['Press_Start_2P'] text-[12px]
                border-4 border-[#ff6a00]
                shadow-[0_4px_10px_rgba(255,106,0,0.6)]
                disabled:opacity-60
                transition-all duration-200
                hover:shadow-[0_6px_15px_rgba(255,106,0,0.8)]
                hover:scale-105 active:scale-95
              "
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="text-xs text-gray-300 mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#ffe600] underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
