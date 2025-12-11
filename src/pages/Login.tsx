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
      // TODO: sign in with Supabase / API
      await new Promise((r) => setTimeout(r, 700));
      navigate("/dashboard"); // change to your route
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/public/login.gif')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-md bg-[rgba(15,15,31,0.9)] p-8 rounded-xl shadow-[0_0_20px_rgba(255,230,0,0.4)] text-white">
        <h1 className="font-['Press_Start_2P'] text-[18px] text-[#ffe600] mb-2">Login</h1>
        <p className="text-sm text-gray-300 mb-6">Welcome Back King!!</p>

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

          {error && <div className="text-sm text-red-400">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ffe600] text-[#0f0f1f] rounded-md py-3 font-['Press_Start_2P'] text-[12px] shadow-[0_4px_10px_rgba(255,230,0,0.6)] disabled:opacity-60"
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
  );
};

export default Login;
