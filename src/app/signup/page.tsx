"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiUser , FiEye, FiEyeOff } from "react-icons/fi";
import BackgroundBubbles from "@/components/BackgroundBubbles";

const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:10000/api";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          role: "student",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      router.push("/login");
    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden">
      <BackgroundBubbles />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Your Account
        </h1>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        {/* Username */}
        <div className="mb-4">
          <label className="flex items-center text-sm font-bold mb-1 text-gray-700">
            <FiUser className="mr-2 text-gray-500" /> Username
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* First Name */}
        <div className="mb-4">
          <label className="flex items-center text-sm font-bold mb-1 text-gray-700"> <FiUser className="mr-2 text-gray-500" /> First Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="flex items-center text-sm font-bold mb-1 text-gray-700"><FiUser className="mr-2 text-gray-500" /> Last Name</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="flex items-center text-sm font-bold mb-1 text-gray-700">
            <FiMail className="mr-2 text-gray-500" /> Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
      {/* Password */}
<div className="mb-4 relative">
  <label className="flex items-center text-sm font-bold mb-1 text-gray-700">
    <FiLock className="mr-2 text-gray-500" /> Password
  </label>
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    value={form.password}
    onChange={handleChange}
    required
    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />

  <span
    className="absolute right-3 top-9 cursor-pointer text-gray-500"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FiEyeOff /> : <FiEye />}
  </span>
</div>


        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#9B4DFF] via-[#B55CFF] to-[#E09EFF] text-white p-2 rounded cursor-pointer hover:opacity-90 transition"
        >
          {loading ? "Creating..." : "Sign up"}
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-purple-800 cursor-pointer font-medium hover:underline"
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
}
