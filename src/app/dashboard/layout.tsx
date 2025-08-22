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

const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api";

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
        const res = await fetch(`${BASE}/users/profile`);
        if (res.ok) {
          const user = await res.json();
          setUserName(user.firstName || user.username || "Student");
        }
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };
    fetchUser();
  }, []);

  return (
       <ProtectedRoute>
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 z-10 relative flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white shadow-md p-4 md:p-6 rounded-lg md:ml-4">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <FiUser className="text-gray-500 text-3xl md:text-4xl" />
            </div>
            <h2 className="mt-3 font-semibold text-center">{userName}</h2>
          </div>

          <nav className="mt-6 space-y-2">
            {dashboardLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 md:px-4 py-2 rounded-md transition
                  ${
                    pathname === link.href
                      ? "bg-purple-100 text-purple-700 font-semibold"
                      : "hover:bg-gray-100 hover:text-purple-600"
                  }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span className="text-sm md:text-base">{link.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
    </ProtectedRoute>
  );
}
