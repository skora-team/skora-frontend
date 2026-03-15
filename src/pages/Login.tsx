import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/api"; // Added for Real ID logic

// BACKEND URL
const BASE_URL = "https://skora-backend.onrender.com";

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

      // 1. API CALL TO THE JWT ENDPOINT
      const response = await fetch(`${BASE_URL}/login-jwt/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          login: username, 
          password: password 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 2. SAVE TOKEN
        localStorage.setItem("token", data.access_token);

        // 3. REAL ID LOGIC (Ensures Zoro stays Zoro and Omkar stays Omkar)
        try {
          const usersRes = await fetch(`${BASE_URL}/users/`);
          const users = await usersRes.json();
          
          // Find the operator in the list by their codename
          const currentOperator = users.find(
            (u: any) => u.username?.toLowerCase() === username.toLowerCase() || 
                        u.name?.toLowerCase() === username.toLowerCase()
          );

          if (currentOperator) {
            auth.setUserId(currentOperator.id); // Save the database ID (8, 9, etc.)
            console.log(`Operator ID ${currentOperator.id} synchronized.`);
          }
        } catch (idErr) {
          console.error("Critical: ID Sync failed.");
        }

        console.log("Login Success!");
        navigate("/DashboardHome"); 
      } else {
        setError(data.detail || "Invalid access key. Try again.");
      }
    } catch (err: any) {
      setError("Uplink failed. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= NAVBAR (ORIGINAL) ================= */}
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
            <li>
              <Link to="/" className="hover:text-yellow-300 text-gray-300">
                Home
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* ================= LOGIN PAGE (ORIGINAL THEME) ================= */}
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
        {/* 👻 GHOST (ORIGINAL THEME) */}
        <div
          className="
            hidden md:flex
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
            src="/ghost-Photoroom.png" 
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
            float-slow
            uppercase
          ">
            Identify yourself,
            <br />
            Operator…
          </div>
        </div>

        {/* LOGIN CARD */}
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
            LOGIN
          </h1>

          <p className="text-sm text-gray-300 mb-6 uppercase font-mono tracking-tighter">
            // Welcome Back Operator!!
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="OPERATOR_NAME"
              className="w-full bg-[#1e1e2f] border-2 border-[#444] rounded-md px-3 py-2 text-white placeholder:text-gray-500 focus:border-[#ffe600] outline-none font-mono"
              required
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="ACCESS_KEY"
              className="w-full bg-[#1e1e2f] border-2 border-[#444] rounded-md px-3 py-2 text-white placeholder:text-gray-500 focus:border-[#ffe600] outline-none font-mono"
              required
            />

            {error && (
              <div className="text-sm text-red-400 font-mono">ERROR: {error}</div>
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
                hover:shadow-[0_6px_15_rgba(255,106,0,0.8)]
                hover:scale-105 active:scale-95
              "
            >
              {loading ? "SYNCING..." : "ENTER_SYSTEM"}
            </button>
          </form>

          <p className="text-xs text-gray-300 mt-4 text-center">
            New to the mission?{" "}
            <Link to="/signup" className="text-[#ffe600] underline uppercase">
              Enroll Here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;