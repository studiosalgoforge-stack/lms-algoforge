// components/notifications/NotificationsList.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter
import { FiArrowLeft } from "react-icons/fi"; // Import the back arrow icon

// Define the structure of a notification object
interface Notification {
  _id: string;
  message: string;
  timestamp: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:10000/api";

export default function NotificationsList() {
  const router = useRouter(); // Initialize useRouter
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setNotifications(data);
        } else {
          // Handle non-OK responses gracefully
          console.error("Failed to fetch notifications:", res.status);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div className="p-6">
      {/* Back button and title */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()} // Use router.back() to go to the previous page
          className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
        >
          <FiArrowLeft className="text-xl" />
        </button>
        <h1 className="text-2xl font-bold text-purple-900">Notifications</h1>
      </div>
      
      {notifications.length > 0 ? (
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li key={notif._id} className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm transition-transform hover:scale-[1.01] hover:shadow-md cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium text-gray-900 text-base leading-snug">
                  {notif.message}
                </p>
              </div>
              <span className="text-sm font-normal text-gray-500">
                {new Date(notif.timestamp).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No new notifications.</p>
      )}
    </div>
  );
}