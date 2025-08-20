"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiMenu, FiX, FiBook, FiMessageSquare, FiMail, FiUser, FiLogOut } from "react-icons/fi";
import LogoutButton from "@/components/ui/LogoutButton";
export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const hiddenLayoutRoutes = ["/login", "/forgot-password"];

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    { href: "/courses", label: "My Courses", icon: <FiBook /> },
    { href: "/forum", label: "Discussion Forum", icon: <FiMessageSquare /> },
    { href: "/support", label: "Support", icon: <FiMail /> },
    { href: "/dashboard", label: "Dashboard", icon: <FiUser /> },
  ];
 if (hiddenLayoutRoutes.includes(pathname)) {
    return <main className="flex-1">{children}</main>;
  }
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <header className="bg-gradient-to-r from-[#9B4DFF] via-[#B55CFF] to-[#E09EFF] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
             <img src="/algo1_logo.jpg" alt="Logo" width={40} height={40}  className="rounded-full"/>
              <h1 className="font-bold text-xl">Algoforge Studios</h1>
            </div>

            {/* Desktop Menu */}
            {isDesktop && (
              <nav>
                <ul className="flex items-center gap-6">
                  {links.map((route) => (
                    <li key={route.href}>
                      <Link
                        href={route.href}
                        className={`flex items-center gap-2 hover:opacity-80 transition
                          ${pathname === route.href ? "underline font-semibold" : ""}`}
                      >
                        <span className="text-white text-lg">{route.icon}</span>
                        <span>{route.label}</span>
                      </Link>
                    </li>
                  ))}
                  {/* Logout Button */}
                  <li>
                  
                     <Link
                  href="/logout"
                  className="flex items-center gap-2 p-2 rounded-md hover:underline underline-offset-2 transition"
                  onClick={() => setIsOpen(false)}
                >
                  <FiLogOut className="text-lg text-white" />
                  Logout
                </Link>
                  </li>
                </ul>
              </nav>
            )}

            {/* Mobile Hamburger */}
            {!isDesktop && (
              <button
                className="text-2xl focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <FiX /> : <FiMenu />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {!isDesktop && isOpen && (
          <nav className="bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-4">
            <ul className="flex flex-col gap-4">
              {links.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className={`flex items-center gap-2 p-2 rounded-md hover:bg-purple-700 transition
                      ${pathname === route.href ? "bg-purple-700 font-semibold" : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-lg text-white">{route.icon}</span>
                    <span>{route.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/logout"
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-purple-700 transition"
                  onClick={() => setIsOpen(false)}
                >
                  <FiLogOut className="text-lg text-white" />
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
