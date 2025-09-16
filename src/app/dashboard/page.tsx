
"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:10000/api";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE}/users/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        if (res.ok) {
          const user = await res.json();
          setUserName(user.firstName || user.username || "Student");
        }
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-purple-600" size={48} />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="px-4 md:px-8">
        <div className="relative w-full h-48 md:h-56 mb-8 rounded-xl">
           <img

          src="/Dash-img.jpg"

          alt="Dashboard Banner"

          className="w-full h-full object-cover rounded-lg"

        />

        {/* Gradient Overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-purple-300 via-pink-200 to-blue-300 opacity-70 rounded-lg" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 
            className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl font-bold text-white drop-shadow-lg text-center px-2">
              Welcome, {userName}!
            </h1>
            <p className="mt-20 text-sm md:text-lg font-medium drop-shadow-md">
              Your learning journey continues here.
            </p>
          </div>
          </div>
        </div>
   
    </ProtectedRoute>
  );
}