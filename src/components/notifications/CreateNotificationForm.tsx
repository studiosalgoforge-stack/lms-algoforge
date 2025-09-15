// components/notifications/CreateNotificationForm.tsx
"use client";
import { useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:10000/api";

export default function CreateNotificationForm() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    
    const token = localStorage.getItem("token");
    if (!token) {
      setStatus("Error: Not authenticated.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/notifications/send`, { // 1. Use the correct POST route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      if (res.ok) {
        setMessage("");
        setStatus("Notification sent successfully!");
      } else {
        const errorData = await res.json();
        setStatus(`Error: ${errorData.message || 'Failed to send notification.'}`);
      }
    } catch (err) {
      setStatus("Error: Network issue or server not responding.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Send Broadcast Notification</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message for all users..."
          rows={4}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Send to All
        </button>
      </form>
      {status && <p className="mt-4 text-center text-sm text-gray-600">{status}</p>}
    </div>
  );
}