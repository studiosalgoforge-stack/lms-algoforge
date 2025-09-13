"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import BackgroundBubbles from "@/components/BackgroundBubbles"; // adjust path if needed

const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:10000/api";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     setLoading(true);
    try {
      const res = await fetch(`${BASE}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      if (!data.token) {
        setError("No token received from server");
        return;
      }

      localStorage.setItem("token", data.token);
      router.push("/courses");
    } catch (err: any) {
      setError("Something went wrong. Check console.");
    }finally {
    setLoading(false); // <-- stop loading after request ends
  }
  };

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Background bubbles */}
      <BackgroundBubbles />

      {/* Login form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white p-8 rounded-lg shadow-md w-96"
      >
        <div className="flex items-center gap-2 mb-3.5 ml-8">
          <img
            src="/algo1_logo.jpg"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="font-bold text-center text-xl">Algoforge Studios</h1>
        </div>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        {/* Username */}
        <div className="mb-4">
          <label className="flex items-center text-sm font-bold mb-1 text-gray-700">
            <FiMail className="mr-2 text-gray-500" /> Email or Username
          </label>
          <input
            type="text"
            placeholder="Email or Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="w-full p-2 mb-4 mt-2.5 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label className="flex items-center text-sm font-bold mb-1 text-gray-700">
            <FiLock className="mr-2 text-gray-500" /> Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 mb-4 mt-2.5 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <span
            className="absolute right-3 top-12 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        {/* Remember Me */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label className="ml-2 text-sm text-gray-700 font-medium">
            Remember me
          </label>

          <p className="text-sm mt-2 text-center">
  {/* <span
    onClick={() => router.push("/forgot-password")}
    className="text-purple-800 ml-22 cursor-pointer font-medium hover:underline"
  >
    Forgot password?
  </span> */}
</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#9B4DFF] via-[#B55CFF] to-[#E09EFF] text-white p-2 rounded cursor-pointer hover:opacity-90 transition"
        >
        {loading ? "Signing in..." : "Sign in"}
        </button>


        <p className="text-sm mt-4 text-center">
  Don’t have an account?{" "}
  <span
    onClick={() => router.push("/signup")}
    className="text-purple-800 cursor-pointer font-medium hover:underline"
  >
    Sign up
  </span>
</p>

      </form>
    </div>
  );
}
