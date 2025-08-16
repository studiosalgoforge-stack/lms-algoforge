"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiUser,
  FiBook,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const dashboardLinks = [
  { href: "/dashboard/profile", label: "Edit Profile", icon: <FiUser /> },
  { href: "/courses", label: "My Courses", icon: <FiBook /> },
  { href: "/dashboard/reports", label: "Reports & Insights", icon: <FiBarChart2 /> },
  { href: "/dashboard/settings", label: "Settings", icon: <FiSettings /> },
  { href: "/logout", label: "Logout", icon: <FiLogOut /> },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 z-10 relative">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-6 ml-4 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <FiUser className="text-gray-500 text-4xl" />
            </div>
            <h2 className="mt-3 font-semibold">Student</h2>
          </div>

          <nav className="mt-6 space-y-2">
            {dashboardLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition
                  ${
                    pathname === link.href
                      ? "bg-purple-100 text-purple-700 font-semibold"
                      : "hover:bg-gray-100 hover:text-purple-600"
                  }`}
              >
                <span className="text-lg">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
