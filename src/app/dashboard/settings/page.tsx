"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/ProtectedRoute";
export default function SettingsPage() {
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPass !== form.confirm) {
      alert("New passwords do not match!");
      return;
    }
    // Call API to update password
    console.log("Password updated!");
  };

  return (
       <ProtectedRoute>
    <div className="p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Change Password</h1>
        <Input
          type="password"
          name="current"
          placeholder="Current Password"
          value={form.current}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="newPass"
          placeholder="New Password"
          value={form.newPass}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="confirm"
          placeholder="Confirm New Password"
          value={form.confirm}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
          Update Password
        </Button>
      </form>
    </div>
    </ProtectedRoute>
  );
}
