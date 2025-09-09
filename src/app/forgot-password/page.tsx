"use client";
import { useState } from "react";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/users/forgot-password`, { email });
      setMsg("Check your email for a reset link");
    } catch (err: any) {
      setMsg(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 w-full rounded mb-4"
        />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded w-full">
          Send Reset Link
        </button>
        {msg && <p className="mt-3 text-sm text-gray-700">{msg}</p>}
      </form>
    </div>
  );
}
