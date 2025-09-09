"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  // Password validation rules
  const validatePassword = (password: string) => {
    const rules: { test: RegExp; message: string }[] = [
      { test: /.{8,}/, message: "At least 8 characters" },
      { test: /[A-Z]/, message: "At least one uppercase letter" },
      { test: /[a-z]/, message: "At least one lowercase letter" },
      { test: /\d/, message: "At least one number" },
      { test: /[!@#$%^&*]/, message: "At least one special character (!@#$%^&*)" },
    ];

    const failed = rules.filter((rule) => !rule.test.test(password)).map((r) => r.message);
    setErrors(failed);
    return failed.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      setMsg("Password does not meet requirements");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/users/reset-password`, {
        token,
        newPassword,
      });
      setMsg("✅ Password reset successful! You can now log in.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setMsg(err.response?.data?.message || "❌ Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>

        {/* New Password */}
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          required
          className="border p-2 w-full rounded mb-2"
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="border p-2 w-full rounded mb-4"
        />

        {/* Validation feedback */}
        <ul className="text-sm mb-3">
          {[
            "At least 8 characters",
            "At least one uppercase letter",
            "At least one lowercase letter",
            "At least one number",
            "At least one special character (!@#$%^&*)",
          ].map((rule) => (
            <li
              key={rule}
              className={errors.includes(rule) ? "text-red-500" : "text-green-600"}
            >
              {rule}
            </li>
          ))}
        </ul>

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full disabled:bg-gray-400"
          disabled={errors.length > 0}
        >
          Reset Password
        </button>

        {msg && <p className="mt-3 text-sm text-gray-700">{msg}</p>}
      </form>
    </div>
  );
}
