"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear JWT/localStorage
    localStorage.removeItem("token");

    // Small delay so user sees effect
    setTimeout(() => {
      router.replace("/login"); // redirect back to login
    }, 500);
  }, [router]);

  return (
       <ProtectedRoute>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <p className="text-gray-700 text-lg font-semibold">
        Logging you out...
      </p>
    </div>
       </ProtectedRoute>
  );
}
