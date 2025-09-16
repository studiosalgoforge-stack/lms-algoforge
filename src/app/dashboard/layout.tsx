"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiUser, FiBook, FiBarChart2, FiSettings, FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

const dashboardLinks = [
  { href: "/dashboard/profile", label: "Edit Profile", icon: <FiUser /> },
  { href: "/courses", label: "My Courses", icon: <FiBook /> },
  { href: "/dashboard/reports", label: "Reports & Insights", icon: <FiBarChart2 /> },
  { href: "/dashboard/settings", label: "Settings", icon: <FiSettings /> },
  { href: "/logout", label: "Logout", icon: <FiLogOut /> },
];

const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:10000/api";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [userName, setUserName] = useState<string>("");

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
        } else {
          console.error("Unauthorized or not found:", res.status);
        }
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex flex-1 z-10 relative flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-white p-4 md:p-6 shadow-md rounded-lg md:ml-4 transition-all duration-300">
            <div className="flex flex-col items-center py-4 border-b border-gray-200 mb-6">
              <div className="w-20 h-20 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-4xl font-semibold">
                {userName.charAt(0).toUpperCase()}
              </div>
              <h2 className="mt-3 text-lg font-bold text-gray-900 text-center">{userName}</h2>
            </div>
            <nav className="space-y-2">
              {dashboardLinks.map((link) => {
                const isCurrent = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${isCurrent
                        ? "bg-purple-400 text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100 hover:text-purple-500"
                      }`}
                  >
                    <span className={`text-xl ${isCurrent ? 'text-white' : 'text-purple-500'}`}>{link.icon}</span>
                    <span className={`text-base font-medium ${isCurrent ? 'text-white' : 'text-gray-800'}`}>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}