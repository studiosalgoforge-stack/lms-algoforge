"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function SettingsPage() {
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
  const [show, setShow] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });
  const [message, setMessage] = useState(""); //  New state for messages
  const [isError, setIsError] = useState(false); //  New state for message type
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:10000/api";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage(""); // Clear message on new input
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    if (form.newPass !== form.confirm) {
      setMessage("New passwords do not match!");
      setIsError(true);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/users/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          current: form.current,
          newPass: form.newPass,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update password");
      }

      // ✅ On success
      setMessage("Password updated successfully! Redirecting to login...");
      setIsError(false);
      localStorage.removeItem("token");
      setForm({ current: "", newPass: "", confirm: "" });

      // Use a short delay for a smoother redirect
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (err: any) {
      // ❌ On failure
      setMessage(err.message || "An unexpected error occurred.");
      setIsError(true);
    }
  };

  const PasswordField = ({
    name,
    value,
    placeholder,
    visible,
    toggle,
  }: {
    name: keyof typeof form;
    value: string;
    placeholder: string;
    visible: boolean;
    toggle: () => void;
  }) => (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="pr-10"
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
      >
        {visible ? <Unlock size={18} /> : <Lock size={18} />}
      </button>
    </div>
  );

  return (
    <ProtectedRoute>
      <div className="p-6 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4"
        >
          <h1 className="text-2xl font-bold text-center">Change Password</h1>

          {/* 🆕 Message Display */}
          {message && (
            <p className={`text-sm text-center font-semibold ${isError ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </p>
          )}

          <PasswordField
            name="current"
            value={form.current}
            placeholder="Current Password"
            visible={show.current}
            toggle={() => setShow({ ...show, current: !show.current })}
          />
          <PasswordField
            name="newPass"
            value={form.newPass}
            placeholder="New Password"
            visible={show.newPass}
            toggle={() => setShow({ ...show, newPass: !show.newPass })}
          />
          <PasswordField
            name="confirm"
            value={form.confirm}
            placeholder="Confirm New Password"
            visible={show.confirm}
            toggle={() => setShow({ ...show, confirm: !show.confirm })}
          />

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Update Password
          </Button>
        </form>
      </div>
    </ProtectedRoute>
  );
}